import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchPetById } from "src/pages/PetView/store/action";
import { getPetById } from "src/pages/PetView/store/api";
import { fetchSimilarPets } from "src/store/sharedStore/similarPets/actions";
import { getSimilarPets } from "src/store/sharedStore/similarPets/api";

import { createNewPets, deletePet, fetchPets, updatePetById } from "./actions";
import { deletePetById, editPetById, getPets, postNewPets } from "./api";

function* onGetPets({ payload }) {
  try {
    yield put(fetchPets.processing());
    const response = yield call(getPets, payload);
    yield put(fetchPets.success(response));
  } catch (error) {
    yield put(fetchPets.failed(error.response));
  }
}

function* onGetSimilarPets({ payload }) {
  try {
    yield put(fetchSimilarPets.processing());
    const response = yield call(getSimilarPets, payload);
    yield put(fetchSimilarPets.success(response));
  } catch (error) {
    yield put(fetchSimilarPets.failed(error.response));
  }
}

function* onGetPetById({ payload }) {
  try {
    yield put(fetchPetById.processing());
    const response = yield call(getPetById, payload);
    yield put(fetchPetById.success(response));
  } catch (error) {
    yield put(fetchPetById.failed(error.response));
  }
}

function* onEditPetById({ payload: { petId, petData } }) {
  try {
    yield put(updatePetById.processing());
    const response = yield call(editPetById, { petId, petData });
    yield put(updatePetById.success(response));
  } catch (error) {
    yield put(updatePetById.failed(error.response));
  }
}

function* onCreatePets({ payload: { formData, currentPage } }) {
  try {
    yield put(createNewPets.processing());
    yield call(postNewPets, formData);

    yield put(fetchPets.request({ page: currentPage }));
  } catch (error) {
    yield put(createNewPets.failed(error.response));
  }
}

function* onDeletePet({ payload }) {
  try {
    yield put(deletePet.processing());
    yield call(deletePetById, payload.petId);
    yield put(deletePet.success({ petId: payload.petId }));
  } catch (error) {
    yield put(deletePet.failed(error.response));
  }
}

function* PetsSaga() {
  yield takeLatest(fetchPets.request, onGetPets);
  yield takeLatest(fetchPetById.request, onGetPetById);
  yield takeLatest(fetchSimilarPets.request, onGetSimilarPets);
  yield takeLatest(updatePetById.request, onEditPetById);
  yield takeLatest(createNewPets.request, onCreatePets);
  yield takeEvery(deletePet.request, onDeletePet);
}

export default PetsSaga;

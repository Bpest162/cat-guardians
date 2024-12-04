import { call, put, takeLatest } from "redux-saga/effects";

import {
  deleteFoundPets,
  editFoundPets,
  fetchClearFoundPets,
  getFoundPets,
  postFoundPets
} from "./action";
import { deleteFoundPetsById, editFoundPetsById, getFoundPetList, postFounPets } from "./api";

function* onGetFoundPets({ payload }) {
  try {
    yield put(getFoundPets.processing());
    const response = yield call(getFoundPetList, payload);
    yield put(getFoundPets.success(response));
  } catch (error) {
    yield put(getFoundPets.failed(error.response));
  }
}

function* onPostFonudPet(action) {
  try {
    yield put(postFoundPets.processing());
    const response = yield call(postFounPets, action.payload);
    yield put(postFoundPets.success(response));
  } catch (error) {
    yield put(postFoundPets.failed(error));
  }
}

function* onClearFound() {
  yield put(fetchClearFoundPets.success(null));
}

function* onEditFoundPetsById({ payload }) {
  try {
    yield put(editFoundPets.processing());
    const response = yield call(editFoundPetsById, payload);
    yield put(editFoundPets.success(response.data));

    yield put(getFoundPets.request({ page: payload.page }));
  } catch (error) {
    yield put(editFoundPets.failed(error.response));
  }
}

function* onDeleteFounPets({ payload }) {
  try {
    yield put(deleteFoundPets.processing());
    yield call(deleteFoundPetsById, payload.itemId);
    yield put(deleteFoundPets.success({ itemId: payload.itemId }));

    yield put(getFoundPets.request({ page: payload.page }));
  } catch (error) {
    yield put(deleteFoundPets.failed(error.response));
  }
}

function* FoundSaga() {
  yield takeLatest(getFoundPets.request, onGetFoundPets);
  yield takeLatest(fetchClearFoundPets.request, onClearFound);
  yield takeLatest(postFoundPets.request, onPostFonudPet);
  yield takeLatest(editFoundPets.request, onEditFoundPetsById);
  yield takeLatest(deleteFoundPets.request, onDeleteFounPets);
}
export default FoundSaga;

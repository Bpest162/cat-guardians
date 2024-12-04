import { call, put, takeLatest } from "redux-saga/effects";

import {
  createAdoption,
  deleteAdoption,
  editAdoption,
  fetchAdoptionList,
  fetchClearAdoption
} from "./action";
import { deleteAdoptionElemById, editAdoptionById, getAdoptionList, postAdoptionForm } from "./api";

function* onGetAdoptionList({ payload }) {
  try {
    yield put(fetchAdoptionList.processing());
    const response = yield call(getAdoptionList, payload);
    yield put(fetchAdoptionList.success(response));
  } catch (error) {
    yield put(fetchAdoptionList.failed(error.response));
  }
}

function* onPostAdoption(action) {
  try {
    yield put(createAdoption.processing());
    const response = yield call(postAdoptionForm, action.payload);
    yield put(createAdoption.success(response));
  } catch (error) {
    const errorResponse = error.response?.data.message;
    yield put(createAdoption.failed(errorResponse));
  }
}

function* onEditAdoptionById({ payload }) {
  try {
    yield put(editAdoption.processing());
    const response = yield call(editAdoptionById, payload);
    yield put(editAdoption.success(response.data));
  } catch (error) {
    yield put(editAdoption.failed(error.response));
  }
}

function* onDeleteAdoptionElem({ payload }) {
  try {
    yield put(deleteAdoption.processing());
    yield call(deleteAdoptionElemById, payload.itemId);
    yield put(deleteAdoption.success({ itemId: payload.itemId }));

    yield put(fetchAdoptionList.request({ page: payload.page }));
  } catch (error) {
    yield put(deleteAdoption.failed(error.response));
  }
}

function* onClearAdoption() {
  yield put(fetchClearAdoption.success(null));
}

function* AdoptionSaga() {
  yield takeLatest(fetchAdoptionList.request, onGetAdoptionList);
  yield takeLatest(fetchClearAdoption.request, onClearAdoption);
  yield takeLatest(createAdoption.request, onPostAdoption);
  yield takeLatest(editAdoption.request, onEditAdoptionById);
  yield takeLatest(deleteAdoption.request, onDeleteAdoptionElem);
}

export default AdoptionSaga;

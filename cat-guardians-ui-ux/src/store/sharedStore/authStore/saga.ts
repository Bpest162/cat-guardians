import { call, put, takeLatest } from "redux-saga/effects";

import { fetchCheckAuth } from "./actions";
import { checkAuth } from "./api";

export function* onCheckAuth() {
  try {
    yield put(fetchCheckAuth.processing());
    const response = yield call(checkAuth);
    yield put(fetchCheckAuth.success(response.data));
  } catch (error) {
    const errorResponse = error.response?.data.message;
    yield put(fetchCheckAuth.failed(errorResponse));
  }
}

function* AuthSaga() {
  yield takeLatest(fetchCheckAuth.request, onCheckAuth);
}

export default AuthSaga;

import { call, put, takeLatest } from "redux-saga/effects";

import { fetchSignUp } from "./actions";
import { postSignUp } from "./api";

export function* onPostSignUp(action) {
  try {
    yield put(fetchSignUp.processing());
    const response = yield call(postSignUp, action.payload);
    yield put(fetchSignUp.success(response));
  } catch (error) {
    const errorResponse = error.response?.data.message;
    yield put(fetchSignUp.failed(errorResponse));
  }
}

function* SignUpSaga() {
  yield takeLatest(fetchSignUp.request, onPostSignUp);
}

export default SignUpSaga;

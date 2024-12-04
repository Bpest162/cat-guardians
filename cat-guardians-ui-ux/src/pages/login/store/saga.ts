import { call, put, takeLatest } from "redux-saga/effects";
import { onCheckAuth } from "src/store/sharedStore/authStore/saga";

import { fetchLogin } from "./actions";
import { postLogin } from "./api";

export function* onPostLogin(action) {
  try {
    yield put(fetchLogin.processing());
    const response = yield call(postLogin, action.payload);
    yield put(fetchLogin.success(response));

    yield call(onCheckAuth);
  } catch (error) {
    const errorResponse = error.response?.data.message;
    yield put(fetchLogin.failed(errorResponse));
  }
}

function* LoginSaga() {
  yield takeLatest(fetchLogin.request, onPostLogin);
}

export default LoginSaga;

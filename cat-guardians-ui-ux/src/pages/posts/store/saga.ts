import { call, put, takeLatest } from "redux-saga/effects";

import { fetchPosts } from "./actions";
import { getPosts } from "./api";

function* onGetPosts() {
  try {
    yield put(fetchPosts.processing());
    const response = yield call(getPosts);
    yield put(fetchPosts.success(response));
  } catch (error) {
    yield put(fetchPosts.failed(error.response));
  }
}

function* PostSaga() {
  yield takeLatest(fetchPosts.request, onGetPosts);
}

export default PostSaga;

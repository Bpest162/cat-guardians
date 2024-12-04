import { all, fork } from "redux-saga/effects";
import AdoptionSaga from "src/pages/adoption/store/saga";
import FoundSaga from "src/pages/found/components/store/saga";
import LoginSaga from "src/pages/login/store/saga";
import PetsSaga from "src/pages/petsList/store/saga";
import PostSaga from "src/pages/posts/store/saga";
import SignUpSaga from "src/pages/signUp/store/saga";

import AuthSaga from "./sharedStore/authStore/saga";

export default function* rootSaga() {
  yield all([fork(PostSaga)]);
  yield all([fork(PetsSaga)]);
  yield all([fork(SignUpSaga)]);
  yield all([fork(LoginSaga)]);
  yield all([fork(FoundSaga)]);
  yield all([fork(AdoptionSaga)]);
  yield all([fork(AuthSaga)]);
}

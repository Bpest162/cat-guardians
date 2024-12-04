import { createReducer } from "typesafe-actions";

import { fetchSignUp } from "./actions";

const initialSignUpState = {
  data: null,
  loading: false,
  error: {
    message: ""
  }
};

export const signUpReducer = createReducer(initialSignUpState)
  .handleAction(fetchSignUp.success, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      error: { message: "" }
    };
  })
  .handleAction(fetchSignUp.failed, (state, { payload }) => {
    return {
      ...state,
      error: {
        message: payload
      }
    };
  });

import { createReducer } from "typesafe-actions";

import { fetchLogin } from "./actions";

const initialLoginState = {
  data: null,
  loading: false,
  error: {
    message: ""
  }
};

export const loginReducer = createReducer(initialLoginState)
  .handleAction(fetchLogin.success, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      error: { message: "" }
    };
  })
  .handleAction(fetchLogin.failed, (state, { payload }) => {
    return {
      ...state,
      error: {
        message: payload
      }
    };
  });

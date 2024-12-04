import { createReducer } from "typesafe-actions";

import { fetchCheckAuth } from "./actions";

const initialAuthState = {
  user: null,
  loading: false,
  error: {
    message: ""
  }
};

export const authReducer = createReducer(initialAuthState)
  .handleAction(fetchCheckAuth.success, (state, { payload }) => ({
    ...state,
    user: payload,
    loading: false
  }))
  .handleAction(fetchCheckAuth.failed, (state, { payload }) => ({
    ...state,
    loading: false,
    error: { message: payload }
  }));

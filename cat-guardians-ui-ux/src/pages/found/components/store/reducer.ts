import { createReducer } from "typesafe-actions";

import { deleteFoundPets, editFoundPets, getFoundPets, postFoundPets } from "./action";
import { fetchClearFoundPets } from "./action";
const initialFormState = {
  data: [],
  loading: false,
  error: {
    message: ""
  }
};
export const foundFormReducer = createReducer(initialFormState)
  .handleAction(getFoundPets.success, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      loading: false
    };
  })
  .handleAction(postFoundPets.success, (state, { payload }) => ({
    ...state,
    data: payload,
    error: { message: "" }
  }))
  .handleAction(fetchClearFoundPets.success, (state) => {
    return {
      ...state,
      data: null,
      error: { message: "" },
      loading: false
    };
  })
  .handleAction(editFoundPets.request, (state, { payload }) => {
    return {
      ...state,
      data: payload.data
    };
  })
  .handleAction(editFoundPets.failed, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  })
  .handleAction(deleteFoundPets.success, (state, { payload }) => {
    return {
      ...state,
      data: state.data.filter((elem) => elem.id !== payload.itemId),
      loading: false
    };
  })
  .handleAction(deleteFoundPets.processing, (state) => {
    return {
      ...state,
      loading: true
    };
  });
export default foundFormReducer;

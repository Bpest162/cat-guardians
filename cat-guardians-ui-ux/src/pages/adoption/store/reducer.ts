import { createReducer } from "typesafe-actions";

import {
  createAdoption,
  deleteAdoption,
  editAdoption,
  fetchAdoptionList,
  fetchClearAdoption
} from "./action";

const initialAdoptionState = {
  data: [],
  loading: false,
  error: {
    message: ""
  }
};

export const adoptionReducer = createReducer(initialAdoptionState)
  .handleAction(fetchAdoptionList.success, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      loading: false
    };
  })
  .handleAction(createAdoption.success, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      error: { message: "" }
    };
  })
  .handleAction(createAdoption.failed, (state, { payload }) => {
    return {
      ...state,
      error: {
        message: payload
      }
    };
  })
  .handleAction(fetchClearAdoption.success, (state) => {
    return {
      ...state,
      data: null,
      error: { message: "" },
      loading: false
    };
  })
  .handleAction(editAdoption.request, (state, { payload }) => {
    return {
      ...state,
      data: payload.data
    };
  })
  .handleAction(editAdoption.failed, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload
    };
  })
  .handleAction(deleteAdoption.success, (state, { payload }) => {
    return {
      ...state,
      data: state.data.filter((elem) => elem.id !== payload.itemId),
      loading: false
    };
  })
  .handleAction(deleteAdoption.processing, (state) => {
    return {
      ...state,
      loading: true
    };
  });

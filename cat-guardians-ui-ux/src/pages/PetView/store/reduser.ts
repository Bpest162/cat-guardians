import { createReducer } from "typesafe-actions";

import { fetchPetById } from "./action";

const initialPetState = {
  pet: {},
  loadingPet: false,
  error: {
    message: ""
  }
};

export const petReducer = createReducer(initialPetState).handleAction(
  fetchPetById.success,
  (state, { payload }) => {
    return {
      ...state,
      pet: payload
    };
  }
);

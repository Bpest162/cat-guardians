import { createReducer } from "typesafe-actions";

import { fetchSimilarPets } from "./actions";
import { InitialStateType } from "./types";

const initialState: InitialStateType = {
  similarPets: [],
  loadingPets: false,
  error: {
    message: ""
  }
};

export const similarPetsReducer = createReducer(initialState).handleAction(
  fetchSimilarPets.success,
  (state, { payload }) => {
    return {
      ...state,
      similarPets: payload
    };
  }
);

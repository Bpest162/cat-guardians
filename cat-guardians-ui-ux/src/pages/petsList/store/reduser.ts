import { createReducer } from "typesafe-actions";

import { createNewPets, deletePet, fetchPets, updatePetById } from "./actions";

const initialState = {
  pets: [],
  loadingPets: true,
  error: {
    message: ""
  }
};

export const petsReducer = createReducer(initialState)
  .handleAction(fetchPets.processing, (state) => {
    return {
      ...state,
      loadingPets: true
    };
  })
  .handleAction(fetchPets.success, (state, { payload }) => {
    return {
      ...state,
      pets: payload,
      loadingPets: false
    };
  })
  .handleAction(updatePetById.failed, (state, { payload }) => {
    return {
      ...state,
      error: payload
    };
  })
  .handleAction(updatePetById.success, (state, { payload }) => {
    return {
      ...state,
      pets: {
        ...state.pets,
        data: state.pets.data.map((pet) => (pet.id == payload.id ? payload : pet))
      }
    };
  })
  .handleAction(createNewPets.failed, (state, { payload }) => {
    return {
      ...state,
      error: {
        message: payload
      }
    };
  })
  .handleAction(deletePet.success, (state, { payload }) => {
    return {
      ...state,
      pets: { ...state.pets, data: state.pets.data.filter((pet) => pet.id !== payload.petId) }
    };
  });

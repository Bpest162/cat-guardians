import { CREATE_PETS, DELETE_PETS, EDIT_PETS, GET_PETS } from "src/constants/api";
import { get, post, remove, update } from "src/services/http/api";
import { defaultType } from "src/services/http/headers";

export const getPets = (payload) =>
  get(GET_PETS, {
    params: { page: payload.page, ordering: payload.ordering, ...payload.filters }
  });

export const editPetById = (payload) => {
  return update(`${EDIT_PETS}/${payload.petId}`, payload.petData, { headers: defaultType });
};

export const postNewPets = (data) => {
  return post(CREATE_PETS, data, { headers: defaultType });
};

export const deletePetById = (petId) => {
  return remove(`${DELETE_PETS}/${petId}`);
};

import {
  DELETE_FOUND_PETS,
  EDDIT_FOUND_PETS,
  GET_FOUND_PETS,
  POST_FOUND_PETS
} from "src/constants/api";
import { get, post, remove, update } from "src/services/http/api";
import { defaultType } from "src/services/http/headers";

export const getFoundPetList = (payload) => {
  return get(GET_FOUND_PETS, {
    params: { page: payload.page }
  });
};
export const postFounPets = (data: FormData) => {
  return post(POST_FOUND_PETS, data, { headers: defaultType });
};

export const editFoundPetsById = (payload) => {
  return update(`${EDDIT_FOUND_PETS}/${payload.itemId}/`, payload.data);
};

export const deleteFoundPetsById = (itemId) => {
  return remove(`${DELETE_FOUND_PETS}/${itemId}/`);
};

import { GET_PETS } from "src/constants/api";
import { get } from "src/services/http/api";

export const getPetById = (payload) => {
  return get(`${GET_PETS}/${payload.petId}`);
};

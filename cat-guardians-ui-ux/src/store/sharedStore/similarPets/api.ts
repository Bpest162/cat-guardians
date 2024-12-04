import { GET_PETS } from "src/constants/api";
import { get } from "src/services/http/api";

export const getSimilarPets = (payload) => {
  return get(`${GET_PETS}?breed__name=${payload.breed__name}`);
};

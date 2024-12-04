import { DELETE_ADOPTION, EDIT_ADOPTION, GET_ADOPTION, POST_ADOPTION } from "src/constants/api";
import { get, post, remove, update } from "src/services/http/api";

import { AdoptionFormValues } from "../lib/adoptionFormYupSchema";

export const getAdoptionList = (payload) => {
  return get(GET_ADOPTION, {
    params: { page: payload.page }
  });
};

export const postAdoptionForm = (data: AdoptionFormValues) => {
  return post(POST_ADOPTION, data);
};

export const editAdoptionById = (payload) => {
  return update(`${EDIT_ADOPTION}/${payload.itemId}/`, payload.data);
};

export const deleteAdoptionElemById = (itemId) => {
  return remove(`${DELETE_ADOPTION}/${itemId}/`);
};

import { GET_USER } from "src/constants/api";
import { get } from "src/services/http/api";

export const checkAuth = () => {
  return get(GET_USER);
};

import { POST_LOGIN } from "src/constants/api";
import { post } from "src/services/http/api";

import { LoginFormValues } from "../lib/loginSchema";

export const postLogin = (data: LoginFormValues) => {
  return post(POST_LOGIN, data);
};

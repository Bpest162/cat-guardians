import { POST_SIGNUP } from "src/constants/api";
import { post } from "src/services/http/api";

import { SignUpFormValues } from "../lib/signUpSchema";

export const postSignUp = (data: SignUpFormValues) => {
  return post(POST_SIGNUP, data);
};

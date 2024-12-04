import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

import { SignUpFormValues } from "../lib/signUpSchema";

export type Params = SignUpFormValues;

export type Response = {
  data?: SignUpFormValues;
};

export const fetchSignUp = action<Response, Params, TDefaultAPIFailureType>("SIGN_UP");

export type TFetchSignUpRequest = ActionType<typeof fetchSignUp.request>;
export type TFetchSignUpSuccess = ActionType<typeof fetchSignUp.success>;
export type TFetchSignUpFail = ActionType<typeof fetchSignUp.failed>;

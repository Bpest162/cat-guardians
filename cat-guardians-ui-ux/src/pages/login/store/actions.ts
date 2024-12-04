import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

import { LoginFormValues } from "../lib/loginSchema";

export type Params = LoginFormValues;

export type Response = {
  data?: LoginFormValues;
};

export const fetchLogin = action<Response, Params, TDefaultAPIFailureType>("LOG_IN");

export type TFetchLoginRequest = ActionType<typeof fetchLogin.request>;
export type TFetchLoginSuccess = ActionType<typeof fetchLogin.success>;
export type TFetchLoginFail = ActionType<typeof fetchLogin.failed>;

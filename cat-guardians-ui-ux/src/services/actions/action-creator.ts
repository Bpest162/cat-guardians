import { TActionPayload, TDefaultAPIFailureType } from "src/types/common";
import { createAction } from "typesafe-actions";

export const PROCESSING = "PROCESSING";
export const SUCCESS = "SUCCESS";
export const FAIL = "FAIL";

export type DefaultActionType = TActionPayload;

export const action = <R = DefaultActionType, S = DefaultActionType, F = TDefaultAPIFailureType>(
  name: string
) => ({
  name,
  request: createAction(name)<R>(),
  processing: createAction(`${name}_${PROCESSING}`)(),
  success: createAction(`${name}_${SUCCESS}`)<S>(),
  failed: createAction(`${name}_${FAIL}`)<F>()
});

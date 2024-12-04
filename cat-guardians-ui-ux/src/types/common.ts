import { AxiosResponse } from "axios";

export type TObject<T = unknown> = Record<string, T>;

export type PropType<T, K extends keyof T> = T[K];

export type TDefaultAPIFailureType = AxiosResponse<TObject> | undefined;
export type TActionPayload = TObject;
export type TDefaultAction = TObject & {
  type: string;
  payload?: TObject;
};

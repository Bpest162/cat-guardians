import { action } from "src/services/actions/action-creator";
import { TDefaultAPIFailureType } from "src/types/common";
import { ActionType } from "typesafe-actions";

export type Params = {
  status?: string;
};

export type Response = {
  posts?: string;
};

export const fetchPosts = action<Params, Response, TDefaultAPIFailureType>("GET_POSTS");

export type TFetchPostRequest = ActionType<typeof fetchPosts.request>;
export type TFetchPostSuccess = ActionType<typeof fetchPosts.success>;
export type TFetchPostFail = ActionType<typeof fetchPosts.failed>;

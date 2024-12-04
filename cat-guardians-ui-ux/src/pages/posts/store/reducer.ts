import { createReducer } from "typesafe-actions";

import { fetchPosts } from "./actions";

const initialState = {
  posts: [],
  loadingPosts: false,
  error: {
    message: ""
  }
};

export const postsReducer = createReducer(initialState).handleAction(
  fetchPosts.success,
  (state, { payload }) => {
    return {
      ...state,
      posts: payload.items
    };
  }
);

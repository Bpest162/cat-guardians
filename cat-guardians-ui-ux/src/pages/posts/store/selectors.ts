import { createSelector } from "reselect";
import { fetchPosts } from "src/pages/posts/store/actions";
import { selectLoadingState, selectLoadingStatus } from "src/store/sharedStore/loading/selectors";
import { ILoadingState } from "src/types/loading";

export const selectPostsState = (state) => state.postsReducer;

export const selectPosts = createSelector(selectPostsState, (store) => store.posts || []);

export const selectPostsRequestLoading = createSelector(
  selectLoadingState,
  (loadingState: ILoadingState) => selectLoadingStatus(loadingState, [fetchPosts.name])
);

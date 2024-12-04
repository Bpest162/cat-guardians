import { createSelector } from "reselect";

export const selectAuthState = (state) => state.authReducer;

export const selectAuthUser = createSelector(selectAuthState, (store) => store.user || null);

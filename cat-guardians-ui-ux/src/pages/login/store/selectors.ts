import { createSelector } from "reselect";

export const selectLoginState = (state) => state.loginReducer;

export const selectLogInData = createSelector(selectLoginState, (store) => store.data || null);

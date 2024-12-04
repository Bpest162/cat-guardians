import { createSelector } from "reselect";

export const selectSignUpState = (state) => state.signUpReducer;

export const selectSignUpData = createSelector(selectSignUpState, (store) => store.data || null);

import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import axiosAuth from "./middleware/axiosAuthMiddleware";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

//TODO: The method is deprecated. According to the Redux doc it's better to change it and use @reduxjs/toolkit instead of this
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(axiosAuth, sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;

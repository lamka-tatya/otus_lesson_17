import { createStore, applyMiddleware } from "redux";
import { reducer } from "./asyncFlow/reducer";
import { probablityMiddleware } from "./probability/probability";
import thunk from "redux-thunk";

export const store = createStore(
  reducer,
  applyMiddleware(thunk, probablityMiddleware)
);

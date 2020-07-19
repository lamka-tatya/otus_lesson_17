import { createStore, applyMiddleware } from "redux";
import { reducer } from "./asyncFlow/reducer";
import { probablityMiddleware } from "./probability/probability";
import { thunkMiddleware } from "./thunk/thunk";

export const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, probablityMiddleware)
);

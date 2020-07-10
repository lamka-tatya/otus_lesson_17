import { createStore, applyMiddleware } from "redux";
import { reducer } from "./asyncFlow/reducer";
import { probablityMiddleware } from "./probability/probability";
import { loadUsersMiddleware } from "./thunk/thunk";

export const store = createStore(
  reducer,
  applyMiddleware(loadUsersMiddleware, probablityMiddleware)
);

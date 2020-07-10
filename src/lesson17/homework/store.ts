import { createStore, applyMiddleware } from "redux";
import { reducer } from "./asyncFlow/reducer";
import { loadUsersMiddleware } from "./thunk";

export const store = createStore(reducer, applyMiddleware(loadUsersMiddleware));

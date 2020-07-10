import { createStore, applyMiddleware } from "redux";
import { reducer } from "./asyncFlow/reducer";
import { loadUsersMiddleware } from "./thunk";
import { probablityMiddleware } from "./probability";

export const store = createStore(reducer, applyMiddleware(loadUsersMiddleware, probablityMiddleware ));

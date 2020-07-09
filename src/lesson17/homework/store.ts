import { createStore } from "redux";
import { reducer } from "./asyncFlow/reducer";

export const store = createStore(reducer);
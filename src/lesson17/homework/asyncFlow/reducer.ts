import { IState, initState } from "../state";
import { Action } from "redux";
import { SET_USERS, START_LOADING, END_LOADING, ERROR } from "./actions";

export function reducer(
  state: IState = initState,
  action: Action & { payload?: any }
) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
  }

  return state;
}

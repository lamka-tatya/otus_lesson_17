import { store } from "../store";

export const LOAD_USERS = "LOAD_USERS";

export const loadUsers = () => {
	store.dispatch({ type: LOAD_USERS });
}
/*

Курс React, урок 17: Middlewares

Домашнее задание 2
src/lesson17/homework/thunk.ts

Напишите свой thunk middleware и подключите в приложение

+1 балл за свой thunk middleware и подключение в приложение
+1 балл за тесты

*/

import {
	START_LOADING,
	SET_USERS,
	ERROR,
	END_LOADING,
} from "../asyncFlow/actions";
import { store } from "@/rdx/store";

export const loadUsersThunk: any = () => (dispatch: any) => {
	dispatch({ type: START_LOADING });

	fetch(`https://swapi.dev/api/people`)
		.then((data) => {
			dispatch({ type: SET_USERS, payload: (data as any).results });
		})
		.catch((error) => {
			dispatch({ type: ERROR, payload: error })})
		.finally(() => {
			dispatch({ type: END_LOADING });
		});
}

export const loadUsers = () => store.dispatch(loadUsersThunk());
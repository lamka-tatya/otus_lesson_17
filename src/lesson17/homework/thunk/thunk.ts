/*

Курс React, урок 17: Middlewares

Домашнее задание 2
src/lesson17/homework/thunk.ts

Напишите свой thunk middleware и подключите в приложение

+1 балл за свой thunk middleware и подключение в приложение
+1 балл за тесты

*/

import { Middleware } from "redux"
import { LOAD_USERS } from "./actions";
import { START_LOADING, SET_USERS, ERROR, END_LOADING } from "../asyncFlow/actions";

export const loadUsersMiddleware: Middleware = ({ dispatch }) => (next) => async (action) => {
	if (action.type === LOAD_USERS) {
		dispatch({ type: START_LOADING });

		fetch(`https://swapi.dev/api/people`)
			.then(data => {
				dispatch({ type: SET_USERS, payload: (data as any).results });
				next(action);
			})
			.catch(error => dispatch({ type: ERROR, payload: error }))
			.finally(() => {
				dispatch({ type: END_LOADING })
			});
	}

	return next(action);
}

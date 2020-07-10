/*

Курс React, урок 17: Middlewares

Домашнее задание 1
src/lesson17/homework/asyncFlow.ts

Напишите async flow который сходит в https://swapi.dev/api/people и сохранит данные в стейте
Нужна обработка различных состояний запроса и тесты

+1 балл за async flow который сохранит данные в стейте
+1 балл за обработку состояний реквеста в пути и ошибок
+1 балл за тесты
+1 балл за разнение по разных файлам и объединение в duck

*/

import { store } from "../store";
import { SET_USERS, START_LOADING, ERROR, END_LOADING } from "./actions";


// Action creators

// Thunks

// Reducer

export const getUsers = async () => {
	store.dispatch({ type: START_LOADING });

	return await fetch(`https://swapi.dev/api/people`)
		.then(data => {
			store.dispatch({ type: SET_USERS, payload: (data as any).results })
		})
		.catch(error => store.dispatch({ type: ERROR, payload: error }))
		.finally(() => store.dispatch({ type: END_LOADING }));
}




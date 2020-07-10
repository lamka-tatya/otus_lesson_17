import { store } from "../store";
import { getUsers } from "./asyncFlow";
import { SET_USERS, START_LOADING, END_LOADING, ERROR } from "./actions";

const str = store;
const errorFetchMock = jest.fn().mockImplementation(() => Promise.resolve(
	Promise.reject("API is down"),
));
const successFetchMock = (result?: any[]) => jest.fn().mockImplementation(() => Promise.resolve(
	Promise.resolve({ results: result ?? [] }),
));

describe("When load users", () => {
	it("should get data", async () => {
		const result = [{ name: "123" }, { name: "456" }, { name: "789" }];
		window.fetch = successFetchMock(result);

		await getUsers();

		expect(str.getState().users).toBe(result);
		expect(str.getState().error).toBe(null);
	})

	it("should dispatch set users", async () => {
		const dispatchSpy = jest.spyOn(str, 'dispatch');
		window.fetch = successFetchMock();

		await getUsers();

		expect(dispatchSpy).toBeCalledWith({ type: SET_USERS, payload: [] })
	})

	it("should dispatch start loading", async () => {
		const dispatchSpy = jest.spyOn(str, 'dispatch');
		window.fetch = successFetchMock();

		await getUsers();

		expect(dispatchSpy).toBeCalledWith({ type: START_LOADING })
	})

	it("should dispatch end loading", async () => {
		const dispatchSpy = jest.spyOn(str, 'dispatch');
		window.fetch = successFetchMock();

		await getUsers();

		expect(dispatchSpy).toBeCalledWith({ type: END_LOADING })
	})

	describe("and error occured while loading", () => {
		it("should set error", async () => {
			window.fetch = errorFetchMock;

			await getUsers();

			expect(str.getState().error).toBe("API is down");
		})

		it("should dispatch error", async () => {
			const dispatchSpy = jest.spyOn(str, 'dispatch');
			window.fetch = errorFetchMock;

			await getUsers();

			expect(dispatchSpy).toBeCalledWith({ type: ERROR, payload: "API is down" })
		})

		it("should dispatch start loading", async () => {
			const dispatchSpy = jest.spyOn(str, 'dispatch');
			window.fetch = errorFetchMock;

			await getUsers();

			expect(dispatchSpy).toBeCalledWith({ type: START_LOADING })
		})

		it("should dispatch end loading", async () => {
			const dispatchSpy = jest.spyOn(str, 'dispatch');
			window.fetch = errorFetchMock;

			await getUsers();

			expect(dispatchSpy).toBeCalledWith({ type: END_LOADING })
		})

		it("should clear error on next load", async () => {
			window.fetch = errorFetchMock;

			await getUsers();
			const prevError = str.getState().error;
			window.fetch = successFetchMock();
			await getUsers();

			expect(prevError).toBe("API is down");
			expect(str.getState().error).toBe(null);
		})
	})


})
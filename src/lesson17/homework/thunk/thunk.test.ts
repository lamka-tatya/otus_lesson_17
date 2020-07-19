import { store } from "../store";
import {
	SET_USERS,
	START_LOADING,
	END_LOADING,
	ERROR,
} from "../asyncFlow/actions";
import { loadUsersThunk, loadUsers } from "./thunk";

describe("When load users", () => {

	let str: any;
	let originalFetch: any;
	let errorFetchMock: any;
	let successFetchMock: any;

	beforeAll(() => {

		originalFetch = window.fetch;
		errorFetchMock = jest
			.fn()
			.mockRejectedValue("API is down");
		successFetchMock = (result?: any[]) =>
			jest
				.fn()
				.mockResolvedValue({ results: result ?? [] });

	});

	afterAll(() => {
		window.fetch = originalFetch;
	});

	beforeEach(() => {
		str = store;
	});

	it("should dispatch set users", async () => {
		const result = [{ name: "123" }, { name: "456" }, { name: "789" }];
		window.fetch = successFetchMock(result);

		const dispatchSpy = jest.spyOn(str, "dispatch");

		loadUsersThunk()(str.dispatch);
		await Promise.resolve();
		await Promise.resolve();

		expect(dispatchSpy).toHaveBeenCalledWith({ type: SET_USERS, payload: result });
	});

	it("should dispatch start loading", async () => {

		window.fetch = successFetchMock();
		const dispatchSpy = jest.spyOn(str, "dispatch");

		loadUsersThunk()(str.dispatch);
		await Promise.resolve();

		expect(dispatchSpy).toHaveBeenCalledWith({ type: START_LOADING });
	});

	it("should dispatch end loading", async () => {
		window.fetch = successFetchMock();
		const dispatchSpy = jest.spyOn(str, "dispatch");

		loadUsersThunk()(str.dispatch);
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();

		expect(dispatchSpy).toHaveBeenCalledWith({ type: END_LOADING });
	});

	describe("and error occured while loading", () => {

		it("should dispatch error", async () => {
			window.fetch = errorFetchMock;
			const dispatchSpy = jest.spyOn(str, "dispatch");

			loadUsersThunk()(str.dispatch);
			await Promise.resolve();
			await Promise.resolve();

			expect(dispatchSpy).toHaveBeenCalledWith({
				type: ERROR,
				payload: "API is down",
			});
		});

		it("should dispatch start loading", async () => {
			window.fetch = errorFetchMock;

			const dispatchSpy = jest.spyOn(str, "dispatch");

			loadUsersThunk()(str.dispatch);
			await Promise.resolve();

			expect(dispatchSpy).toHaveBeenCalledWith({ type: START_LOADING });
		});

		it("should dispatch end loading", async () => {
			window.fetch = errorFetchMock;

			const dispatchSpy = jest.spyOn(str, "dispatch");

			loadUsersThunk()(str.dispatch);
			await Promise.resolve();
			await Promise.resolve();
			await Promise.resolve();
			await Promise.resolve();
			await Promise.resolve();

			expect(dispatchSpy).toHaveBeenCalledWith({ type: END_LOADING });
		});
	});
});

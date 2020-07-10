import { store } from "./store";
import { SET_USERS, START_LOADING, END_LOADING, ERROR } from "./asyncFlow/actions";
import { loadUsers, LOAD_USERS } from "./thunk/actions";
import { loadUsersMiddleware } from "./thunk";

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

		loadUsers();
		await Promise.resolve();

		expect(str.getState().users).toBe(result);
		expect(str.getState().error).toBe(null);
	})

	it("should pass to next action", async () => {
		window.fetch = successFetchMock();
		const fakeNext = jest.fn();

		loadUsersMiddleware(str)(fakeNext)({ type: LOAD_USERS });
		await Promise.resolve();

		expect(fakeNext).toBeCalledWith({ type: LOAD_USERS });
	})

	it("should dispatch set users", async () => {
		window.fetch = successFetchMock();
		const fakeDispatch = jest.fn();

		loadUsersMiddleware({ dispatch: fakeDispatch } as any)(jest.fn())({ type: LOAD_USERS });
		await Promise.resolve();

		expect(fakeDispatch).toHaveBeenCalledWith({ type: SET_USERS, payload: [] });
	})

	it("should dispatch start loading", async () => {
		window.fetch = successFetchMock();
		const fakeDispatch = jest.fn();

		loadUsersMiddleware({ dispatch: fakeDispatch } as any)(jest.fn())({ type: LOAD_USERS });
		await Promise.resolve();

		expect(fakeDispatch).toHaveBeenCalledWith({ type: START_LOADING });
	})

	it("should dispatch end loading", async () => {
		window.fetch = successFetchMock();
		const fakeDispatch = jest.fn();

		loadUsersMiddleware({ dispatch: fakeDispatch } as any)(jest.fn())({ type: LOAD_USERS });
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();

		expect(fakeDispatch).toHaveBeenCalledWith({ type: END_LOADING });
	})

	describe("and error occured while loading", () => {
		it("should dispatch error", async () => {
			window.fetch = errorFetchMock;
			const fakeDispatch = jest.fn();

			loadUsersMiddleware({ dispatch: fakeDispatch } as any)(jest.fn())({ type: LOAD_USERS });
			await Promise.resolve();
			await Promise.resolve();

			expect(fakeDispatch).toHaveBeenCalledWith({ type: ERROR, payload: "API is down" });
		})

		it("should set error", async () => {
			window.fetch = errorFetchMock;

			loadUsers();
			await Promise.resolve();
			await Promise.resolve();

			expect(str.getState().error).toBe("API is down");
		})

		it("should dispatch start loading", async () => {
			window.fetch = errorFetchMock;

			const fakeDispatch = jest.fn();

			loadUsersMiddleware({ dispatch: fakeDispatch } as any)(jest.fn())({ type: LOAD_USERS });
			await Promise.resolve();

			expect(fakeDispatch).toHaveBeenCalledWith({ type: START_LOADING });
		})

		it("should dispatch end loading", async () => {
			window.fetch = errorFetchMock;

			const fakeDispatch = jest.fn();

			loadUsersMiddleware({ dispatch: fakeDispatch } as any)(jest.fn())({ type: LOAD_USERS });
			await Promise.resolve();
			await Promise.resolve();
			await Promise.resolve();

			expect(fakeDispatch).toHaveBeenCalledWith({ type: END_LOADING });
		})

		it("should clear error on next load", async () => {
			window.fetch = errorFetchMock;

			loadUsers();
			await Promise.resolve();
			await Promise.resolve();
			const prevError = str.getState().error;
			window.fetch = successFetchMock();
			loadUsers();
			await Promise.resolve();
			await Promise.resolve();

			expect(prevError).toBe("API is down");
			expect(str.getState().error).toBe(null);
		})
	})
})
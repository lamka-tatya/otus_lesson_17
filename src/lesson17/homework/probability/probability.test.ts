import { store } from "../store";
import { probablityMiddleware } from "./probability";
import { ANALYTICS_CLICK } from "./actions";

const str = store;

describe("When run probability", () => {
	it("should always pass to next action with probability 1", () => {
		const fakeNext = jest.fn();

		probablityMiddleware(str)(fakeNext)({ type: ANALYTICS_CLICK, meta: { probability: 1 } });

		expect(fakeNext).toBeCalledTimes(1);
	})

	it("should never pass to next action with probability 0", () => {
		const fakeNext = jest.fn();

		probablityMiddleware(str)(fakeNext)({ type: ANALYTICS_CLICK, meta: { probability: 0 } });

		expect(fakeNext).toBeCalledTimes(0);
	})
})
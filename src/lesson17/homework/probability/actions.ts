import { store } from "../store";

export const ANALYTICS_CLICK = "ANALYTICS_CLICK";

export const analyticsClick = (probability: number) => {
	store.dispatch({ type: ANALYTICS_CLICK, meta: { probability } });
}
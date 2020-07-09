export interface IState {
	users: any[];
	isLoading: boolean;
	error: string | null;
}

export const initState: IState = {
	users: [],
	isLoading: false,
	error: null
}

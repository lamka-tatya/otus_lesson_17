export interface State {
  users: any[];
  isLoading: boolean;
  error: string | null;
}

export const initState: State = {
  users: [],
  isLoading: false,
  error: null,
};

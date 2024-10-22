import { useDebouncedCallback } from "use-debounce";
import { getUsersByName, getUsersByEmail } from "@/services";
import type { Action, initialState } from "../store/generalSettingsState";

export const useDebouncedSearch = (
	state: typeof initialState,
	dispatch: (value: Action) => void,
) => {
	const debouncedSearch = useDebouncedCallback(async (value: string) => {
		//@ts-ignore
		if (state.searchingBy.has("username")) {
			const users = await getUsersByName(value);
			if (users.length === 0) {
				return dispatch({ type: "SET_USERS", payload: [] });
			}
			dispatch({ type: "SET_USERS", payload: users });
			return;
		}

		//@ts-ignore
		if (state.searchingBy.has("email")) {
			const users = await getUsersByEmail(value);
			if (users.length === 0) {
				return dispatch({ type: "SET_USERS", payload: [] });
			}
			dispatch({ type: "SET_USERS", payload: users });
			return;
		}
	}, 700);

	return debouncedSearch;
};

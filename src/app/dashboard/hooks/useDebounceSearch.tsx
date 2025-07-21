import { useDebouncedCallback } from "use-debounce";
import { getUsersByEmail } from "@/services/users/getUsersByEmail";
import { getUsersByName } from "@/services/users/getUsersByName";
import type {
	FormSettingsAction,
	FormSettingsState,
} from "../edit-form/store/state";
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

export const useDebouncedSearch2 = (
	state: FormSettingsState,
	dispatch: (value: FormSettingsAction) => void,
) => {
	const debouncedSearch = useDebouncedCallback(async (value: string) => {
		const result = await getUsersByName(value);
		if (result.length === 0) {
			dispatch({ type: "SET_USERS", payload: [] });
			return;
		}
		dispatch({ type: "SET_USERS", payload: result });
	}, 700);

	return debouncedSearch;
};

import type { FormSettingsAction, FormSettingsState } from "../store/state";
import { getUserById } from "@/services/users/getUserById";

export const selectUser = async (
	id: number,
	state: FormSettingsState,
	dispatch: (value: FormSettingsAction) => void,
) => {
	if (state.selectedUsers.find((user) => user.id === id)) return;
	const user = await getUserById(id);
	if (!user) return dispatch({ type: "SET_TEXT_SEARCH_VALUE", payload: "" });
	dispatch({
		type: "SET_SELECTED_USERS",
		payload: [...state.selectedUsers, user],
	});
	dispatch({ type: "SET_TEXT_SEARCH_VALUE", payload: "" });
};

export const deleteSelectedUser = (
	id: number,
	state: FormSettingsState,
	dispatch: (value: FormSettingsAction) => void,
) => {
	const newUsers = state.selectedUsers.filter((user) => user.id !== id);
	dispatch({ type: "SET_SELECTED_USERS", payload: newUsers });
};

import { getUserById } from "@/services/users/getUserById";
import type { Action, initialState } from "../store/generalSettingsState";

export const selectUser = async (
	id: number,
	state: typeof initialState,
	dispatch: (value: Action) => void,
) => {
	if (state.selectedUsers.find((user) => user.id === id)) return;
	const user = await getUserById(id);
	if (!user) return dispatch({ type: "SET_INPUT_VALUE", payload: "" });
	dispatch({
		type: "SET_SELECTED_USERS",
		payload: [...state.selectedUsers, user],
	});
	dispatch({ type: "SET_INPUT_VALUE", payload: "" });
};

export const deleteSelectedUser = (
	id: number,
	state: typeof initialState,
	dispatch: (value: Action) => void,
) => {
	const newUsers = state.selectedUsers.filter((user) => user.id !== id);
	dispatch({ type: "SET_SELECTED_USERS", payload: newUsers });
};

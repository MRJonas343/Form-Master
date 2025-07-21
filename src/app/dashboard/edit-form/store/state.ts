import type { Selection } from "@nextui-org/react";
import type { UserType } from "@/interfaces";
import type { FormGeneralData } from "@/interfaces/formDataToUpdate";

export type FormSettingsAction =
	| { type: "SET_IS_SUBMITTING"; payload: boolean }
	| { type: "SET_IS_FORM_PUBLIC"; payload: boolean }
	| { type: "SET_TOPICS_STATE"; payload: Selection }
	| { type: "SET_IMAGE"; payload: File | null }
	| { type: "SET_TEXT_SEARCH_VALUE"; payload: string }
	| { type: "SET_SEARCHING_BY"; payload: Selection }
	| { type: "SET_USERS"; payload: UserType[] }
	| { type: "SET_SELECTED_USERS"; payload: UserType[] };

export interface FormSettingsState {
	isSubmitting: boolean;
	isFormPublic: boolean;
	topicsState: Selection;
	image: File | null;
	textSearchValue: string;
	searchingBy: Selection;
	users: UserType[];
	selectedUsers: UserType[];
}

export interface FormSettingsInitialState {
	isSubmitting: boolean;
	isFormPublic: boolean;
	topicsState: Selection;
	image: File | null;
	textSearchValue: string;
	searchingBy: Selection;
	users: UserType[];
	selectedUsers: UserType[];
}

export const initializer = (data: FormGeneralData): FormSettingsState => ({
	isSubmitting: false,
	isFormPublic: data.form.isPublic,
	topicsState: new Set([data.form.topic]),
	image: null,
	textSearchValue: "",
	searchingBy: new Set(["username"]),
	users: [],
	selectedUsers: [...data.usersWithPermissions],
});

export const formSettingsReducer = (
	state: FormSettingsState,
	action: FormSettingsAction,
): FormSettingsState => {
	switch (action.type) {
		case "SET_IS_SUBMITTING":
			return { ...state, isSubmitting: action.payload };
		case "SET_IS_FORM_PUBLIC":
			return { ...state, isFormPublic: action.payload };
		case "SET_TOPICS_STATE":
			return { ...state, topicsState: action.payload };
		case "SET_IMAGE":
			return { ...state, image: action.payload };
		case "SET_TEXT_SEARCH_VALUE":
			return { ...state, textSearchValue: action.payload };
		case "SET_SEARCHING_BY":
			return { ...state, searchingBy: action.payload };
		case "SET_USERS":
			return { ...state, users: action.payload };
		case "SET_SELECTED_USERS":
			return { ...state, selectedUsers: action.payload };
		default:
			return state;
	}
};

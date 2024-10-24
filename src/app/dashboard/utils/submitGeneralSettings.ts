import type { Action, initialState } from "../store/generalSettingsState";
import type { FormSettings } from "@/interfaces";
import { createForm } from "@/services";
import type { Session } from "next-auth";
import type { Dispatch } from "react";

export const submitGeneralSettings = async (
	data: FormSettings,
	setFormId: Dispatch<string>,
	changeTab: (tab: string) => void,
	dispatch: (value: Action) => void,
	state: typeof initialState,
	session?: Session,
) => {
	dispatch({ type: "SET_SUBMITTING", payload: true });

	if (data.otherTopic) data.topic = data.otherTopic;

	const formData = new FormData();
	if (state.image) formData.append("image", state.image);
	const userId = Number.parseInt(session?.user?.id ?? "");

	const formId = await createForm(data, userId, state.selectedUsers, formData);

	if (formId === "INVALID_FORM") return;
	setFormId(formId.toString());
	changeTab("set-questions");

	dispatch({ type: "SET_SUBMITTING", payload: false });
};

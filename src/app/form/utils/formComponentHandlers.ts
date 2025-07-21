import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { formGeneralData } from "@/interfaces/question";
import type { FormAction, FormState } from "../store/state";
import { createComment } from "@/services/comments/createComment";
import { fillForm } from "@/services/filledForms/fillForm";
import type { Session } from "next-auth";
import toast from "react-hot-toast";

export const updateValue = (
	id: number,
	value: string | boolean | number,
	state: FormState,
	dispatch: (value: FormAction) => void,
) => {
	dispatch({
		type: "SET_QUESTIONS_STATE",
		payload: state.questionsState.map((question) =>
			question.id === id ? { ...question, value } : question,
		),
	});
};

export const submitForm = async (
	formGeneralData: formGeneralData,
	state: FormState,
	dispatch: (value: FormAction) => void,
	router: AppRouterInstance,
	session: Session | null,
) => {
	dispatch({ type: "SET_IS_SUBMITTING", payload: true });

	const questionsToUpdate = state.questionsState.map((question) => {
		if (question.type === "long" && typeof question.value === "undefined") {
			question.value = "";
		}
		if (question.type === "short" && typeof question.value === "undefined") {
			question.value = "";
		}
		if (question.type === "multiple" && typeof question.value === "undefined") {
			question.value = "";
		}
		if (question.type === "single" && typeof question.value === "undefined") {
			question.value = false;
		}
		if (question.type === "numeric") {
			question.value =
				typeof question.value === "undefined" ? 0 : Number(question.value);
		}
		return question;
	});

	const result = await fillForm({
		form: questionsToUpdate,
		isFormLiked: state.isFormLiked,
		shouldSendCopy: state.shouldSendCopy,
		userId: Number.parseInt(session?.user?.id ?? ""),
		formId: formGeneralData.id,
		userEmail: session?.user?.email,
		userName: session?.user?.name,
		formName: formGeneralData.title,
	});

	if (result === "SUCCESS") toast.success("Form submitted successfully");

	router.push("/dashboard");

	dispatch({ type: "SET_IS_SUBMITTING", payload: false });
};

export const uploadComment = async (
	formGeneralData: formGeneralData,
	state: FormState,
	dispatch: (value: FormAction) => void,
	session: Session | null,
) => {
	if (!state.comment) return;
	await createComment(
		formGeneralData.id,
		Number.parseInt(session?.user?.id ?? ""),
		state.comment,
	);

	dispatch({ type: "SET_COMMENT", payload: "" });
};

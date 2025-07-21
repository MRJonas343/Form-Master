import type { Dispatch } from "react";
import { deleteQuestion } from "@/services/edit-form/deleteQuestion";
import type {
	FormQuestionsAction,
	FormQuestionsState,
} from "../store/stateEditQuestions";

export const deleteControlledQuestion = async (
	questonId: string,
	formId: number,
	state: FormQuestionsState,
	dispatch: Dispatch<FormQuestionsAction>,
) => {
	await deleteQuestion(formId, Number.parseInt(questonId));

	const updatedQuestions = state.questionsState.filter(
		(question) => question.id !== questonId,
	);

	dispatch({
		type: "SET_QUESTIONS_STATE",
		payload: updatedQuestions,
	});
};

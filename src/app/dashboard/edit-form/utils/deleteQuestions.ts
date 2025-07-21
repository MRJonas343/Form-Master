import type {
	FormQuestionsAction,
	FormQuestionsState,
} from "../store/stateEditQuestions";
import { deleteQuestion } from "@/services/edit-form/deleteQuestion";
import type { Dispatch } from "react";

export const deleteControlledQuestion = async (
	questonId: number,
	formId: number,
	state: FormQuestionsState,
	dispatch: Dispatch<FormQuestionsAction>,
) => {
	await deleteQuestion(formId, questonId);

	const updatedQuestions = state.questionsState.filter(
		(question) => Number.parseInt(question.id) !== questonId,
	);

	dispatch({
		type: "SET_QUESTIONS_STATE",
		payload: updatedQuestions,
	});
};

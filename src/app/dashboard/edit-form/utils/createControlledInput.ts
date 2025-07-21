import type { Dispatch } from "react";
import type { QuestionType } from "@/interfaces";
import { v4 as uuid } from "uuid";
import type { Question } from "@/interfaces/formDataToUpdate";
import { addQuestion } from "@/services/edit-form/addQuestion";
import type { FormQuestionsAction } from "../store/stateEditQuestions";

export const createControlledInput = async (
	formId: number,
	questionsState: Question[],
	dispatch: Dispatch<FormQuestionsAction>,
) => {
	let question: Question = {
		id: uuid(),
		question: `Question ${questionsState.length + 1}`,
		type: "short" as QuestionType,
		description: "",
		order: questionsState.length + 1,
		formId: formId,
		displayInTable: false,
	};

	const newQuestion = await addQuestion(formId, question);

	question = {
		...question,
		id: newQuestion.toString(),
	};

	dispatch({
		type: "SET_QUESTIONS_STATE",
		payload: [...questionsState, question],
	});
};

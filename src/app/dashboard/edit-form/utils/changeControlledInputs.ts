import type { FormQuestionsAction } from "../store/stateEditQuestions";
import type { Dispatch } from "react";

export const changeControlledInputs = (
	id: string,
	key: string,
	value: string | boolean,
	dispatch: Dispatch<FormQuestionsAction>,
) => {
	const adjustedKey = key === "questionName" ? "question" : key;

	dispatch({
		type: "UPDATE_QUESTION_INPUT",
		payload: { id, key: adjustedKey, value },
	});
};

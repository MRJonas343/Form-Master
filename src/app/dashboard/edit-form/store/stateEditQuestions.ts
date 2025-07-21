import type { Question } from "@/interfaces/formDataToUpdate";
import { arrayMove } from "@dnd-kit/sortable";

export type FormQuestionsAction =
	| { type: "SET_QUESTION_TO_DELETE"; payload: string | null }
	| { type: "SET_QUESTIONS_STATE"; payload: Question[] }
	| { type: "SET_IS_SUBMITTING"; payload: boolean }
	| {
			type: "REORDER_QUESTIONS";
			payload: { oldIndex: number; newIndex: number };
	  }
	| {
			type: "UPDATE_QUESTION_INPUT";
			payload: { id: string; key: string; value: string | boolean };
	  }
	| {
			type: "UPDATE_QUESTION_OPTIONS";
			payload: { id: string; options: string[] };
	  };
export interface FormQuestionsState {
	questionToDelete: string | null;
	questionsState: Question[];
	isSubmitting: boolean;
}

export const initializer = (data: Question[]): FormQuestionsState => ({
	questionToDelete: null,
	questionsState: data,
	isSubmitting: false,
});

export const formQuestionsReducer = (
	state: FormQuestionsState,
	action: FormQuestionsAction,
): FormQuestionsState => {
	switch (action.type) {
		case "SET_QUESTION_TO_DELETE":
			return { ...state, questionToDelete: action.payload };
		case "SET_QUESTIONS_STATE":
			return { ...state, questionsState: action.payload };
		case "SET_IS_SUBMITTING":
			return { ...state, isSubmitting: action.payload };
		case "REORDER_QUESTIONS": {
			const { oldIndex, newIndex } = action.payload;
			const updatedQuestions = arrayMove(
				[...state.questionsState],
				oldIndex,
				newIndex,
			);
			return { ...state, questionsState: updatedQuestions };
		}
		case "UPDATE_QUESTION_INPUT": {
			const { id, key, value } = action.payload;
			const adjustedKey = key === "questionName" ? "question" : key;
			return {
				...state,
				questionsState: state.questionsState.map((question) =>
					question.id === id ? { ...question, [adjustedKey]: value } : question,
				),
			};
		}
		case "UPDATE_QUESTION_OPTIONS": {
			const { id, options } = action.payload;
			const formattedOptions = options.map((optionText, index) => ({
				id: index + 1,
				questionId: Number.parseInt(id),
				optionText: optionText,
			}));
			return {
				...state,
				questionsState: state.questionsState.map((question) =>
					question.id === id ? { ...question, options: formattedOptions } : question,
				),
			};
		}
		default:
			return state;
	}
};

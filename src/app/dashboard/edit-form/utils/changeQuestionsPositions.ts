import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Dispatch, SetStateAction } from "react";
import type { Question } from "@/interfaces/formDataToUpdate";
import { swapQuestions } from "@/services/edit-form/swapQuestions";
import type {
	FormQuestionsAction,
	FormQuestionsState,
} from "../store/stateEditQuestions";

export const changeQuestionsPositions = async (
	state: FormQuestionsState,
	formId: number,
	event: DragEndEvent,
	dispatch: (value: FormQuestionsAction) => void,
) => {
	const { active, over } = event;

	if (!active || !over) return;

	if (active.id !== over.id) {
		const oldIndex = state.questionsState.findIndex(
			(item) => item.id === active.id,
		);
		const newIndex = state.questionsState.findIndex(
			(item) => item.id === over.id,
		);

		if (oldIndex !== -1 && newIndex !== -1) {
			dispatch({
				type: "REORDER_QUESTIONS",
				payload: { oldIndex, newIndex },
			});

			await swapQuestions(formId, active.id as number, over.id as number);
		}
	}
};

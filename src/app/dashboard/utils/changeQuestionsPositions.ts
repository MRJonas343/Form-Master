import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Dispatch, SetStateAction } from "react";
import type { NewQuestion } from "@/interfaces";

export const changeQuestionsPositions = (
	event: DragEndEvent,
	setQuestions: Dispatch<SetStateAction<NewQuestion[]>>,
) => {
	const { active, over } = event;

	if (!active || !over) return;

	if (active.id !== over.id) {
		setQuestions((prevQuestions) => {
			const oldIndex = prevQuestions.findIndex((item) => item.id === active.id);
			const newIndex = prevQuestions.findIndex((item) => item.id === over.id);

			return arrayMove(prevQuestions, oldIndex, newIndex);
		});
	}
};

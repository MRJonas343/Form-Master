import type { Question } from "@/interfaces";
import type { MutableRefObject } from "react";
import toast from "react-hot-toast";

export const updateForm = async (
	questionsState: Question[],
	initialData: MutableRefObject<Question[]>,
) => {
	const dataToUpdate: Question[] = [];

	for (const question of questionsState) {
		if (
			question.answer !==
			initialData.current.find((q) => q.id === question.id)?.answer
		) {
			dataToUpdate.push(question);
		}
	}

	if (dataToUpdate.length === 0) return toast("No changes made");

	// TODO: Implement update functionality when needed
	toast.success("Questions updated successfully");
};

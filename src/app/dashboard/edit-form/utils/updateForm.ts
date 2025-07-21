import type { Question } from "@/interfaces/formDataToUpdate";
import type { MutableRefObject } from "react";
import type { Changes } from "@/interfaces";
import toast from "react-hot-toast";
import { updateFormQuestions } from "@/services/edit-form/updateFormQuestions";

export const updateForm = async (
	questionsState: Question[],
	initialData: MutableRefObject<Question[]>,
) => {
	const questionsToUpdata = [] as Changes[];

	for (const question of questionsState) {
		const questionId = question.id;
		if (
			question.question !==
			initialData.current.find((q) => q.id === questionId)?.question
		) {
			questionsToUpdata.push({
				questionId: Number.parseInt(questionId),
				fieldChanged: "question",
				newValue: question.question,
			});
		}
	}

	for (const question of questionsState) {
		const questionId = question.id;
		if (
			question.description !==
			initialData.current.find((q) => q.id === questionId)?.description
		) {
			questionsToUpdata.push({
				questionId: Number.parseInt(questionId),
				fieldChanged: "description",
				newValue: question.description ?? "",
			});
		}
	}

	for (const question of questionsState) {
		const questionId = question.id;
		if (
			question.displayInTable !==
			initialData.current.find((q) => q.id === questionId)?.displayInTable
		) {
			questionsToUpdata.push({
				questionId: Number.parseInt(questionId),
				fieldChanged: "displayInTable",
				newValue: question.displayInTable,
			});
		}
	}

	for (const question of questionsState) {
		const questionId = question.id;
		if (!initialData.current.find((q) => q.id === questionId)) {
			questionsToUpdata.push({
				questionId: Number.parseInt(questionId),
				fieldChanged: "type",
				//@ts-ignore
				newValue: question.questionType || question.type,
			});
		}
	}

	if (questionsToUpdata.length === 0) return toast("No changes made");

	const result = await updateFormQuestions(questionsToUpdata);
	return "SUCCESS";
};

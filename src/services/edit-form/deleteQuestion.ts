"use server";

import { revalidatePath } from "next/cache";
import { editFormRepository } from "@/repositories";

export const deleteQuestion = async (formId: number, questionId: number) => {
	await editFormRepository.deleteQuestionById(formId, questionId);

	revalidatePath(`/dashboard/edit-form/${formId}`);
};

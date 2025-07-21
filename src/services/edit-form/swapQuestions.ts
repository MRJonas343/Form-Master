"use server";

import { revalidatePath } from "next/cache";
import { editFormRepository } from "@/repositories";

export const swapQuestions = async (
	formId: number,
	quesId1: number,
	quesId2: number,
) => {
	const result = await editFormRepository.swapQuestions(
		formId,
		quesId1,
		quesId2,
	);

	revalidatePath(`/dashboard/edit-form/${formId}`);
	return result;
};

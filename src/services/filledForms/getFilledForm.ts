"use server";

import { filledFormsRepository } from "@/repositories";

export const getFilledForm = async (formId: number, userId: string) => {
	const filledForm = await filledFormsRepository.getFormWithUserAnswers(
		userId,
		formId,
	);

	return filledForm;
};

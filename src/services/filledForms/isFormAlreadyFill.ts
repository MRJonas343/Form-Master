"use server";

import { filledFormsRepository } from "@/repositories";

export const isFormAlreadyFill = async (userId: string, formId: number) => {
	const result = await filledFormsRepository.getFilledFormsByUserId(
		userId,
		formId,
	);

	if (result) return true;

	return false;
};

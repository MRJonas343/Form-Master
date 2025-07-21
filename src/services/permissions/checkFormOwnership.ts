"use server";

import { formRepository } from "@/repositories";

export const checkFormOwnership = async (formId: number, userId: string) => {
	const result = await formRepository.getFormById(formId);

	if (!result) return false;

	return result.author_id === userId;
};

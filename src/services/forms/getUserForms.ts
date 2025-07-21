"use server";

import { dashboardRepository } from "@/repositories";

export const getUserForms = async (userId: string) => {
	const forms = await dashboardRepository.getUserForms(userId);

	return forms;
};

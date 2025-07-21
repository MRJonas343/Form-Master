"use server";

import { dashboardRepository } from "@/repositories";

export const getAllFormsByUserId = async (userId: string) => {
	const forms = await dashboardRepository.getAllUserFormsByUserId(userId);

	return forms;
};

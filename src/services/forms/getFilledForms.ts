"use server";

import { dashboardRepository } from "@/repositories";

export const getFilledFormsByUser = async (userId: string) => {
	const forms = await dashboardRepository.getUserFilledForms(userId);

	const formatedForms = forms.map((form) => ({
		...form,
		filledAt: form.filledAt.toDateString(),
	}));

	return formatedForms;
};

"use server";

import { revalidatePath } from "next/cache";
import { formRepository } from "@/repositories";

export const deleteFormAction = async (formId: number) => {
	await formRepository.deleteFormById(formId);
	revalidatePath("/dashboard");
	return "SUCCESS";
};

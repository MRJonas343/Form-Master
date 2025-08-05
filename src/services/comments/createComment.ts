"use server";

import { revalidatePath } from "next/cache";
import { commentsRepository } from "@/repositories";

export const createComment = async (
	formId: number,
	userId: string,
	comment: string
) => {
	await commentsRepository.createComment(userId, formId, comment);

	revalidatePath(`/form/${formId}`);

	return "SUCCESS";
};

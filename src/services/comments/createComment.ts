"use server";

import { commentsRepository } from "@/repositories";
import { revalidatePath } from "next/cache";

export const createComment = async (
	formId: number,
	userId: string,
	comment: string,
) => {
	const result = await commentsRepository.createComment(
		userId,
		formId,
		comment,
	);

	revalidatePath(`/form/${formId}`);

	return "SUCCESS";
};

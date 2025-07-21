"use server";

import type { NewFilledForm } from "@/interfaces";
import { formRepository } from "@/repositories";
import { sendCopyOfAnswers } from "@/utils/sendCopyOfAnswers";
import "dotenv/config";

export const fillForm = async (data: NewFilledForm) => {
	if (data.userEmail && data.shouldSendCopy) sendCopyOfAnswers(data);

	const result = await formRepository.insertAnswers(data);

	if (data.isFormLiked) await formRepository.insertLike(data);

	return "SUCCESS";
};

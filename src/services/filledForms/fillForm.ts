"use server";

import type { NewFilledForm } from "@/interfaces";
import { formRepository } from "@/repositories";
import { sendCopyOfAnswers } from "@/utils/sendCopyOfAnswers";
import "dotenv/config";

export const fillForm = async (data: NewFilledForm) => {
	// Send email copy if requested
	if (data.userEmail && data.shouldSendCopy) {
		try {
			await sendCopyOfAnswers(data);
		} catch {
			// Log the error but do not block form submission
		}
	}

	await formRepository.insertAnswers(data);

	if (data.isFormLiked) await formRepository.insertLike(data);

	return "SUCCESS";
};

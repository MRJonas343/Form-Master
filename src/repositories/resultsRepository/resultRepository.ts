import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { answers, options, questions } from "@/db/schemas";

async function getFormResponses(formId: number) {
	const questionsData = await db
		.select({
			questionId: questions.id,
			questionText: questions.question,
			type: questions.type,
		})
		.from(questions)
		.where(eq(questions.formId, formId));

	const responses = await Promise.all(
		questionsData.map(async (question) => {
			const answersData = await db
				.select({
					value: answers.value,
				})
				.from(answers)
				.where(eq(answers.questionID, question.questionId));

			const answerValues = answersData.map((answer) => answer.value);

			let optionsText: string[] | undefined;
			if (question.type === "multiple") {
				const optionsData = await db
					.select({
						optionText: options.optionText,
					})
					.from(options)
					.where(eq(options.questionId, question.questionId));

				optionsText = optionsData.map((opt) => opt.optionText);
			}

			return {
				questionId: question.questionId,
				question: question.questionText,
				type: question.type,
				options: optionsText,
				answers: answerValues,
			};
		}),
	);

	return responses;
}

export const resultRepository = {
	getFormResponses,
};

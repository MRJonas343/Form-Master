import { asc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { options, questions } from "@/db/schemas";
import type { NewQuestion } from "@/interfaces";
import { createOptions } from "@/utils/createOptions";

const setNewFormQuestions = async (
	formId: number,
	questionsArray: NewQuestion[],
) => {
	const questionsObjects = questionsArray.map((question, index) => ({
		formId: formId,
		question: question.questionName,
		description: question.description,
		displayInTable: question.displayInTable,
		order: index + 1,
		type: question.questionType,
	}));

	await db.insert(questions).values(questionsObjects);

	const insertedQuestions = await db
		.select({
			id: questions.id,
			question: questions.question,
		})
		.from(questions)
		.where(eq(questions.formId, formId));

	const optionsObjectsToInsert = createOptions(
		insertedQuestions,
		questionsArray,
	);

	if (optionsObjectsToInsert.length > 0) {
		await db.insert(options).values(optionsObjectsToInsert);
	}
};

const getQuestionsByFormId = async (formId: number) => {
	const result = await db
		.select({
			id: questions.id,
			question: questions.question,
			description: questions.description,
			displayInTable: questions.displayInTable,
			order: questions.order,
			type: questions.type,
		})
		.from(questions)
		.where(eq(questions.formId, formId))
		.orderBy(asc(questions.order));

	const multipleQuestions = result.filter(
		(question) => question.type === "multiple",
	);

	let optionsMap: { [key: number]: string[] } = {};

	if (multipleQuestions.length > 0) {
		const multipleQuestionIds = multipleQuestions.map((q) => q.id);

		const optionsResult = await db
			.select({
				questionId: options.questionId,
				optionText: options.optionText,
			})
			.from(options)
			.where(inArray(options.questionId, multipleQuestionIds));

		optionsMap = optionsResult.reduce(
			(acc, option) => {
				if (!acc[option.questionId]) {
					acc[option.questionId] = [];
				}
				acc[option.questionId].push(option.optionText);
				return acc;
			},
			{} as { [key: number]: string[] },
		);
	}

	const questionsWithOptions = result.map((question) => {
		if (question.type === "multiple") {
			return {
				...question,
				options: optionsMap[question.id] || [],
			};
		}
		return question;
	});

	return questionsWithOptions;
};

export const questionsRepository = {
	setNewFormQuestions,
	getQuestionsByFormId,
};

import { db } from "@/db";
import {
	answers,
	comments,
	forms,
	options,
	questions,
	users,
} from "@/db/schemas";
import { eq, and, inArray, asc, sql } from "drizzle-orm";

const getFormWithUserAnswers = async (userId: number, formId: number) => {
	const [form, commentsResult, questionsResult] = await Promise.all([
		db.query.forms.findFirst({
			where: eq(forms.id, formId),
		}),
		db
			.select({
				id: comments.id,
				comment: comments.comment,
				userName: users.name,
			})
			.from(comments)
			.innerJoin(users, eq(comments.user_id, users.id))
			.where(eq(comments.form_id, formId)),

		db
			.select({
				id: questions.id,
				question: questions.question,
				description: questions.description,
				displayInTable: questions.displayInTable,
				order: questions.order,
				type: questions.type,
				answer: answers.value,
			})
			.from(questions)
			.leftJoin(
				answers,
				and(
					eq(questions.id, answers.questionID),
					eq(
						answers.filledFormID,
						sql`(SELECT id FROM filled_forms WHERE user_id = ${userId} AND form_id = ${formId})`,
					),
				),
			)
			.where(eq(questions.formId, formId))
			.orderBy(asc(questions.order)),
	]);

	const multipleQuestions = questionsResult.filter(
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

	const questionsWithOptions = questionsResult.map((question) => {
		if (question.type === "multiple") {
			return {
				...question,
				options: optionsMap[question.id] || [],
			};
		}
		return question;
	});

	return { form, commentsResult, questions: questionsWithOptions };
};

export const filledFormsRepository = {
	getFormWithUserAnswers,
};
import { db } from "@/db";
import {
	answers,
	comments,
	filledForms,
	forms,
	options,
	questions,
	users,
} from "@/db/schemas";
import type { Question } from "@/interfaces";
import { eq, and, inArray, asc, sql, desc } from "drizzle-orm";

const getFormWithUserAnswers = async (userId: string, formId: number) => {
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
				filledFormID: answers.id,
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
		const questionIds = multipleQuestions.map((q) => q.id);

		const optionsResult = await db
			.select({
				questionId: options.questionId,
				optionText: options.optionText,
			})
			.from(options)
			.where(inArray(options.questionId, questionIds));

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

	const questionsWithOptions: Question[] = questionsResult.map((question) => ({
		...question,
		options: optionsMap[question.id] || [],
	}));

	return {
		form,
		questions: questionsWithOptions,
		comments: commentsResult,
	};
};

const getFilledFormsByFormId = async (formId: number) => {
	const result = await db
		.select({
			userId: filledForms.user_id,
			userName: users.name,
			filledAt: filledForms.filled_at,
		})
		.from(filledForms)
		.innerJoin(forms, eq(filledForms.form_id, forms.id))
		.innerJoin(users, eq(filledForms.user_id, users.id))
		.where(eq(filledForms.form_id, formId))
		.orderBy(desc(filledForms.filled_at));

	return result;
};

const getFilledFormsByUserId = async (userId: string, formId: number) => {
	const result = await db.query.filledForms.findFirst({
		where: and(
			eq(filledForms.user_id, userId),
			eq(filledForms.form_id, formId),
		),
	});

	return result;
};

const getFilledFormAnswers = async (userId: string, formId: number) => {
	const result = await db
		.select({
			id: answers.id,
			questionId: answers.questionID,
			value: answers.value,
			filledFormId: answers.filledFormID,
		})
		.from(answers)
		.innerJoin(filledForms, eq(answers.filledFormID, filledForms.id))
		.where(
			and(
				eq(filledForms.user_id, userId),
				eq(filledForms.form_id, formId),
			),
		);

	return result;
};

export const filledFormsRepository = {
	getFormWithUserAnswers,
	getFilledFormsByFormId,
	getFilledFormsByUserId,
	getFilledFormAnswers,
};

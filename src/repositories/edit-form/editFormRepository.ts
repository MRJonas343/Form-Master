import { and, eq, or } from "drizzle-orm";
import { db } from "@/db";
import { forms, questions } from "@/db/schemas";
import type { QuestionType } from "@/interfaces";
import type { Question } from "@/interfaces/formDataToUpdate";

type FormUpdateData = {
	title?: string;
	topic?: string;
	description?: string;
	isPublic?: boolean;
	imageUrl?: string;
};

const getPrevImage = async (formId: number) => {
	const result = await db
		.select({
			imageUrl: forms.imageUrl,
		})
		.from(forms)
		.where(eq(forms.id, formId))
		.limit(1);

	return result[0].imageUrl;
};

const updateFormById = async (formId: number, data: FormUpdateData) => {
	if (Object.keys(data).length === 0) return;

	const result = await db.update(forms).set(data).where(eq(forms.id, formId));
};

const deleteQuestionById = async (formId: number, questionId: number) => {
	const result = await db
		.delete(questions)
		.where(and(eq(questions.formId, formId), eq(questions.id, questionId)));

	return result;
};

const swapQuestions = async (
	formId: number,
	questionId1: number,
	questionId2: number,
) => {
	const [question1, question2] = await Promise.all([
		db
			.select({
				order: questions.order,
			})
			.from(questions)
			.where(and(eq(questions.id, questionId1), eq(questions.formId, formId)))
			.limit(1),
		db
			.select({
				order: questions.order,
			})
			.from(questions)
			.where(and(eq(questions.id, questionId2), eq(questions.formId, formId)))
			.limit(1),
	]);

	if (!question1 || !question2) return;

	await db.transaction(async (tx) => {
		await tx
			.update(questions)
			.set({ order: question2[0].order })
			.where(and(eq(questions.id, questionId1), eq(questions.formId, formId)));

		await tx
			.update(questions)
			.set({ order: question1[0].order })
			.where(and(eq(questions.id, questionId2), eq(questions.formId, formId)));
	});
};

const addQuestionById = async (formId: number, question: Question) => {
	const result = await db.insert(questions).values({
		question: question.question,
		formId,
		order: question.order,
		description: "",
		displayInTable: false,
		type: "short",
	});
	return result;
};

const editQuestionName = async (
	questionId: number,
	newQuestionName: string,
) => {
	const result = await db
		.update(questions)
		.set({ question: newQuestionName })
		.where(eq(questions.id, questionId));

	return result;
};

const editQuestionDescription = async (
	questionId: number,
	newQuestionDescription: string,
) => {
	const result = await db
		.update(questions)
		.set({ description: newQuestionDescription })
		.where(eq(questions.id, questionId));

	return result;
};

const editQuestionDisplayInTable = async (
	questionId: number,
	newQuestionDisplayInTable: boolean,
) => {
	const result = await db
		.update(questions)
		.set({ displayInTable: newQuestionDisplayInTable })
		.where(eq(questions.id, questionId));

	return result;
};

const editQuestionType = async (
	questionId: number,
	newQuestionType: QuestionType,
) => {
	const result = await db
		.update(questions)
		.set({ type: newQuestionType })
		.where(eq(questions.id, questionId));

	return result;
};

export const editFormRepository = {
	getPrevImage,
	updateFormById,
	deleteQuestionById,
	addQuestionById,
	swapQuestions,
	editQuestionName,
	editQuestionDescription,
	editQuestionDisplayInTable,
	editQuestionType,
};

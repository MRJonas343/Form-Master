import { filledForms, forms, likes, questions, users } from "@/db/schemas";
import { eq, and, desc, count } from "drizzle-orm";
import { db } from "@/db";

const getUserForms = async (userId: string) => {
	const formsResult = await db
		.select({
			formId: forms.id,
			formName: forms.title,
			topic: forms.topic,
			title: forms.title,
		})
		.from(forms)
		.where(eq(forms.author_id, userId));

	const formWithQuestions = await Promise.all(
		formsResult.map(async (form) => {
			const questionsResult = await db
				.select({
					question: questions.question,
				})
				.from(questions)
				.where(
					and(
						eq(questions.formId, form.formId),
						eq(questions.displayInTable, true),
					),
				);

			const questionsArray = questionsResult.map((q) => q.question);

			return {
				formId: form.formId,
				topic: form.topic,
				formName: form.formName,
				questions: questionsArray,
			};
		}),
	);

	return formWithQuestions;
};

const getUserFilledForms = async (userId: string) => {
	const result = await db
		.select({
			formId: forms.id,
			formName: forms.title,
			topic: forms.topic,

			filledAt: filledForms.filled_at,
		})
		.from(filledForms)
		.innerJoin(forms, eq(filledForms.form_id, forms.id))
		.where(eq(filledForms.user_id, userId))
		.orderBy(desc(filledForms.filled_at));

	return result;
};

const getAllUserFormsByUserId = async (userId: string) => {
	const result = db
		.select({
			id: forms.id,
			authorName: users.name,
			title: forms.title,
			imageUrl: forms.imageUrl,
			likes: count(likes.id),
		})
		.from(forms)
		.innerJoin(users, eq(forms.author_id, users.id))
		.innerJoin(likes, eq(likes.form_id, forms.id))
		.where(eq(forms.author_id, userId))
		.groupBy(forms.id, users.name, forms.title, forms.imageUrl)
		.orderBy(desc(count(likes.id)));

	return result;
};

export const dashboardRepository = {
	getUserForms,
	getUserFilledForms,
	getAllUserFormsByUserId,
};

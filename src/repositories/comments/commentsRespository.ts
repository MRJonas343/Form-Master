import { db } from "@/db";
import { comments, users } from "@/db/schemas";
import { eq } from "drizzle-orm";

const getComments = async (formId: number) => {
	const result = await db
		.select({
			id: comments.id,
			comment: comments.comment,
			userName: users.name,
		})
		.from(comments)
		.innerJoin(users, eq(comments.user_id, users.id))
		.where(eq(comments.form_id, formId));

	return result;
};

const createComment = async (
	userId: string,
	formId: number,
	comment: string,
) => {
	const result = await db.insert(comments).values({
		user_id: userId,
		form_id: formId,
		comment,
	});

	return result;
};

export const commentsRepository = {
	getComments,
	createComment,
};

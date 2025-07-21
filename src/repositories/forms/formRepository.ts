import type { FormCardProps, FormSettings, NewFilledForm } from "@/interfaces";
import {
	answers,
	filledForms,
	forms,
	formTags,
	likes,
	tags,
	users,
} from "@/db/schemas";
import { db } from "@/db";
import { count, eq, sql, and } from "drizzle-orm";
import { desc } from "drizzle-orm";

const createForm = async (
	data: FormSettings,
	userId: string,
	imageUrl: string,
) => {
	const result = await db.insert(forms).values({
		author_id: userId,
		title: data.title,
		topic: data.topic,
		description: data.description,
		imageUrl: imageUrl,
		isPublic: data.isPublic,
	});

	if (data.tags.length > 0) {
		const tags = data.tags.split(",").map((tag) => ({
			form_id: result[0].insertId,
			tag_id: Number.parseInt(tag),
		}));

		await db.insert(formTags).values(tags);
	}

	return result[0].insertId;
};

const getLastForms = async (offset: number, limit: number) => {
	const result = await db
		.select({
			id: forms.id,
			title: forms.title,
			authorName: users.name,
			imageUrl: forms.imageUrl,
			likes: count(likes.id),
		})
		.from(forms)
		.innerJoin(users, eq(forms.author_id, users.id))
		.leftJoin(likes, eq(likes.form_id, forms.id))
		.groupBy(forms.id, users.name, forms.title, forms.imageUrl)
		.orderBy(desc(forms.created_at))
		.limit(limit)
		.offset((offset - 1) * limit);

	return result;
};

const getFormsByTag = async (tag: string, offset: number, limit: number) => {
	const result = await db
		.select({
			id: forms.id,
			title: forms.title,
			authorName: users.name,
			imageUrl: forms.imageUrl,
			likes: count(likes.id),
		})
		.from(forms)
		.innerJoin(users, eq(forms.author_id, users.id))
		.leftJoin(likes, eq(likes.form_id, forms.id))
		.innerJoin(formTags, eq(forms.id, formTags.form_id))
		.innerJoin(tags, eq(formTags.tag_id, tags.id))
		.where(eq(tags.tag, tag))
		.groupBy(forms.id, users.name, forms.title, forms.imageUrl)
		.limit(limit)
		.offset((offset - 1) * limit);

	return result;
};

const findFormsWithFullTextSearch = async (search: string) => {
	const [
		resultsInFormTable,
		resultsInUserTable,
		resultsInQuestionsTable,
		resultsInCommentsTable,
	] = await Promise.all([
		db.execute(sql`
      SELECT f.id, f.title, u.name AS authorName, f.image_url AS imageUrl, COUNT(l.id) AS likes
      FROM forms f
      INNER JOIN user u ON f.author_id = u.id
      LEFT JOIN likes l ON f.id = l.form_id
      WHERE MATCH(f.title, f.topic, f.description) AGAINST (${search} IN NATURAL LANGUAGE MODE)
      GROUP BY f.id, u.name, f.title, f.image_url
    `),
		db.execute(sql`
      SELECT f.id, f.title, u.name AS authorName, f.image_url AS imageUrl, COUNT(l.id) AS likes
      FROM forms f
      INNER JOIN user u ON f.author_id = u.id
      LEFT JOIN likes l ON f.id = l.form_id
      WHERE u.name LIKE CONCAT('%', ${search}, '%')
      GROUP BY f.id, u.name, f.title, f.image_url
    `),
		db.execute(sql`
      SELECT f.id, f.title, u.name AS authorName, f.image_url AS imageUrl, COUNT(l.id) AS likes
      FROM forms f
      INNER JOIN user u ON f.author_id = u.id
      LEFT JOIN likes l ON f.id = l.form_id
      INNER JOIN questions q ON q.form_id = f.id
      WHERE MATCH(q.question, q.description) AGAINST (${search} IN NATURAL LANGUAGE MODE)
      GROUP BY f.id, u.name, f.title, f.image_url
    `),
		db.execute(sql`
      SELECT f.id, f.title, u.name AS authorName, f.image_url AS imageUrl, COUNT(l.id) AS likes
      FROM forms f
      INNER JOIN user u ON f.author_id = u.id
      LEFT JOIN likes l ON f.id = l.form_id
      INNER JOIN comments c ON c.form_id = f.id
      WHERE MATCH(c.comment) AGAINST (${search} IN NATURAL LANGUAGE MODE)
      GROUP BY f.id, u.name, f.title, f.image_url
    `),
	]);

	const results1 = resultsInUserTable[0] as unknown as FormCardProps[];
	const results2 = resultsInFormTable[0] as unknown as FormCardProps[];
	const results3 = resultsInQuestionsTable[0] as unknown as FormCardProps[];
	const results4 = resultsInCommentsTable[0] as unknown as FormCardProps[];

	const mergedResults = [
		...results1,
		...results2,
		...results3,
		...results4,
	].filter(
		(item, index, self) => index === self.findIndex((t) => t.id === item.id),
	);

	return mergedResults;
};

const getFormById = async (id: number) => {
	const result = await db.query.forms.findFirst({
		where: eq(forms.id, id),
	});

	return result;
};

const insertFilledForm = async (data: NewFilledForm) => {
	const result = await db.insert(filledForms).values({
		form_id: data.formId,
		user_id: data.userId,
	});

	return result[0].insertId;
};

const insertAnswers = async (data: NewFilledForm) => {
	const filledFormId = await insertFilledForm(data);

	const answersToInsert = data.form.map((question) => ({
		questionID: question.id,
		filledFormID: filledFormId,
		value: question.value,
	}));

	await db.insert(answers).values(answersToInsert);
};

const insertLike = async (data: NewFilledForm) => {
	const isFormLiked = await db
		.select({
			id: likes.id,
		})
		.from(likes)
		.where(and(eq(likes.form_id, data.formId), eq(likes.user_id, data.userId)))
		.limit(1);

	if (isFormLiked.length > 0) return;

	await db.insert(likes).values({ form_id: data.formId, user_id: data.userId });
};

const haveTheUserFilledTheForm = async (formId: number, userId: string) => {
	const result = await db
		.select({
			id: filledForms.id,
			user_id: filledForms.user_id,
		})
		.from(filledForms)
		.where(
			and(eq(filledForms.form_id, formId), eq(filledForms.user_id, userId)),
		)
		.limit(1);

	return result.length > 0;
};

const getPopularForms = async () => {
	const result = await db
		.select({
			id: forms.id,
			title: forms.title,
			authorName: users.name,
			imageUrl: forms.imageUrl,
			answerTimes: count(filledForms.id),
		})
		.from(forms)
		.innerJoin(users, eq(forms.author_id, users.id))
		.leftJoin(filledForms, eq(filledForms.form_id, forms.id))
		.groupBy(forms.id, users.name, forms.title, forms.imageUrl)
		.orderBy(desc(count(filledForms.id)))
		.limit(5);

	return result;
};

const deleteFormById = async (formId: number) => {
	const result = await db.delete(forms).where(eq(forms.id, formId));

	return result;
};

export const formRepository = {
	getFormById,
	getLastForms,
	createForm,
	getFormsByTag,
	findFormsWithFullTextSearch,
	insertAnswers,
	insertLike,
	haveTheUserFilledTheForm,
	getPopularForms,
	deleteFormById,
};

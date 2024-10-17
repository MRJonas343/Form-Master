import type { FormCardProps, FormSettings } from "@/interfaces";
import { forms, formTags, likes, tags, users } from "@/db/schemas";
import { db } from "@/db";
import { count, eq, sql } from "drizzle-orm";
import { desc } from "drizzle-orm";

const createForm = async (
	data: FormSettings,
	userId: number,
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
	console.log(mergedResults);

	return mergedResults;
};

export const formRepository = {
	getLastForms,
	createForm,
	getFormsByTag,
	findFormsWithFullTextSearch,
};

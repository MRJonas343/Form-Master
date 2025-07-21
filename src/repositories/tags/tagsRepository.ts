import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { formTags, tags } from "@/db/schemas";

type Tags = {
	form_id: number;
	tag_id: number;
};

const getTagsByFormId = async (formId: number) => {
	const result = await db
		.select({
			tagId: tags.id,
			tagName: tags.tag,
		})
		.from(formTags)
		.innerJoin(tags, eq(formTags.tag_id, tags.id))
		.where(eq(formTags.form_id, formId));

	return result;
};

const deleteTagsByFormId = async (formId: number, tags: Tags[]) => {
	const result = await db.delete(formTags).where(
		and(
			eq(formTags.form_id, formId),
			inArray(
				formTags.tag_id,
				tags.map((tag) => tag.tag_id),
			),
		),
	);

	return result;
};

const insertTagsByFormId = async (formId: number, tags: Tags[]) => {
	const result = await db.insert(formTags).values(tags);

	return result;
};

export const tagsRepository = {
	getTagsByFormId,
	deleteTagsByFormId,
	insertTagsByFormId,
};

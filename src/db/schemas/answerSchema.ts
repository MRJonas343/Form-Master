import { int, json, mysqlTable } from "drizzle-orm/mysql-core";
import { filledForms, questions } from ".";

export const answers = mysqlTable("answers", {
	id: int("id").primaryKey().autoincrement(),
	questionID: int("question_id")
		.notNull()
		.references(() => questions.id, { onDelete: "cascade" }),
	filledFormID: int("filled_form_id")
		.notNull()
		.references(() => filledForms.id, { onDelete: "cascade" }),
	value: json("value").notNull(),
});

export type InsertAnswer = typeof answers.$inferInsert;

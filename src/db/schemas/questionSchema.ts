import {
	boolean,
	int,
	mysqlEnum,
	mysqlTable,
	text,
} from "drizzle-orm/mysql-core";
import { forms } from "./formSchema";

export const questions = mysqlTable("questions", {
	id: int("id").primaryKey().autoincrement(),
	formId: int("form_id")
		.notNull()
		.references(() => forms.id, { onDelete: "cascade" }),
	question: text("question").notNull(),
	description: text("description"),
	displayInTable: boolean("display_in_table").default(false).notNull(),
	order: int("order").notNull(),
	type: mysqlEnum("type", ["short", "long", "numeric", "single", "multiple"])
		.default("short")
		.notNull(),
});

export type InsertQuestion = typeof questions.$inferInsert;

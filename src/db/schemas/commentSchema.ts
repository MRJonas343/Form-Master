import { int, bigint, mysqlTable, text } from "drizzle-orm/mysql-core";
import { users, forms } from ".";

export const comments = mysqlTable("comments", {
	id: int("id").primaryKey().autoincrement(),
	user_id: bigint("user_id", { mode: "number" })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	form_id: int("form_id")
		.notNull()
		.references(() => forms.id, { onDelete: "cascade" }),
	comment: text("comment").notNull(),
});

export type InsertComment = typeof comments.$inferInsert;

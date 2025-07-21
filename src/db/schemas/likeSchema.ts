import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { forms, users } from ".";

export const likes = mysqlTable("likes", {
	id: int("id").primaryKey().autoincrement(),
	user_id: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	form_id: int("form_id")
		.notNull()
		.references(() => forms.id, { onDelete: "cascade" }),
});

export type InsertLike = typeof likes.$inferInsert;

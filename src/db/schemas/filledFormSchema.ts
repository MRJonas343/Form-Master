import { sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { forms, users } from ".";

export const filledForms = mysqlTable("filled_forms", {
	id: int("id").primaryKey().autoincrement(),
	form_id: int("form_id")
		.notNull()
		.references(() => forms.id, { onDelete: "cascade" }),
	user_id: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	filled_at: timestamp().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export type InsertFilledForm = typeof filledForms.$inferInsert;

import { int, bigint, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { users, forms } from ".";

export const filledForms = mysqlTable("filled_forms", {
	id: int("id").primaryKey().autoincrement(),
	form_id: int("form_id")
		.notNull()
		.references(() => forms.id, { onDelete: "cascade" }),
	user_id: bigint("user_id", { mode: "number" })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	filled_at: timestamp().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export type InsertFilledForm = typeof filledForms.$inferInsert;

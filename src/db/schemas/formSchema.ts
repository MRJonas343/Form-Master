import { sql } from "drizzle-orm";
import { users } from "./userSchema";
import {
	boolean,
	int,
	mysqlTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";

export const forms = mysqlTable("forms", {
	id: int("id").autoincrement().primaryKey(),
	author_id: varchar("author_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	created_at: timestamp().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	title: text("title").notNull(),
	topic: varchar("topic", { length: 100 }).notNull(),
	description: text("description").notNull(),
	isPublic: boolean("is_public").default(true).notNull(),
	imageUrl: varchar("image_url", { length: 255 }).notNull(),
});

export type InsertForm = typeof forms.$inferInsert;

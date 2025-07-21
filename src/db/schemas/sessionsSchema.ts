import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from ".";

export const sessions = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
	userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

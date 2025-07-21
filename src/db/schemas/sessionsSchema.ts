import { bigint, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from ".";

export const sessions = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
	userId: bigint("userId", { mode: "number" })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

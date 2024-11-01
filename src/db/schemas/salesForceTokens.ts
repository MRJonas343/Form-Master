import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const salesForceTokens = mysqlTable("salesforce_tokens", {
	id: int("id").primaryKey().autoincrement(),
	access_token: varchar("access_token", { length: 255 }).notNull(),
});

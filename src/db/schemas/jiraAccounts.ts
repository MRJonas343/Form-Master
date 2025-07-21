import { int, bigint, mysqlTable, varchar, primaryKey } from "drizzle-orm/mysql-core";
import { users } from ".";

export const jiraAccounts = mysqlTable("jira_account", {
	id: int("id").primaryKey().autoincrement(),
	userId: bigint("userId", { mode: "number" })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	jiraAccountId: varchar("jiraAccountId", { length: 255 }).notNull(),
});

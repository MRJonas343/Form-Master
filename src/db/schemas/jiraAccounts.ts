import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from ".";

export const jiraAccounts = mysqlTable("jira_account", {
	id: int("id").primaryKey().autoincrement(),
	userId: varchar("userId", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	jiraAccountId: varchar("jiraAccountId", { length: 255 }).notNull(),
});

import { int, mysqlTable, varchar, primaryKey } from "drizzle-orm/mysql-core";
import { users } from ".";

export const jiraAccounts = mysqlTable("jira_account", {
	userId: int("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	jiraAccountId: varchar("jiraAccountId", { length: 255 }).notNull(),
});

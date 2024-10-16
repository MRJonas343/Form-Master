import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { forms, users } from ".";

export const formPermissions = mysqlTable("form_permissions", {
	id: int("id").autoincrement().primaryKey(),
	form_id: int("form_id")
		.notNull()
		.references(() => forms.id, { onDelete: "cascade" }),
	user_id: int("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

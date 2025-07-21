import {
	mysqlTable,
	varchar,
	mysqlEnum,
	uniqueIndex,
	index,
	timestamp,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
	"user",
	{
		id: varchar("id", { length: 255 }).primaryKey(),
		name: varchar("name", { length: 50 }).notNull(),
		email: varchar("email", { length: 50 }).unique().notNull(),
		password: varchar("password", { length: 255 }),
		role: mysqlEnum("role", ["admin", "user"]).notNull().default("user"),
		status: mysqlEnum("status", ["active", "blocked"])
			.notNull()
			.default("active"),
		emailVerified: timestamp("emailVerified", {
			mode: "date",
			fsp: 3,
		}),
		image: varchar("image", { length: 255 }),
	},
	(table) => {
		return {
			nameIdx: index("name_idx").on(table.name),
			emailIdx: uniqueIndex("email_idx").on(table.email),
		};
	},
);

export type InsertUser = typeof users.$inferInsert;

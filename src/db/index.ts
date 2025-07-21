import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { tablesSchemas } from "./tablesSchemas";
import "dotenv/config";

const poolConnection = mysql.createPool({
	host: process.env.DATABASE_HOST ?? "",
	user: process.env.DATABASE_USER ?? "",
	database: process.env.DATABASE_NAME ?? "",
	password: process.env.DATABASE_PASSWORD ?? "",
	port: Number.parseInt(process.env.DATABASE_PORT ?? ""),
});

export const db = drizzle(poolConnection, {
	schema: tablesSchemas,
	mode: "default",
});

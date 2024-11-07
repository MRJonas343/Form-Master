import { db } from "@/db";
import { jiraAccounts } from "@/db/schemas";
import { eq } from "drizzle-orm";

const createJiraAccount = async (userId: number, jiraAccountId: string) => {
	const result = await db.insert(jiraAccounts).values({
		userId,
		jiraAccountId,
	});

	return result;
};

const getJiraAccount = async (userId: number) => {
	const result = await db.query.jiraAccounts.findFirst({
		where: eq(jiraAccounts.userId, userId),
	});

	return result;
};

export const jiraRepository = {
	createJiraAccount,
	getJiraAccount,
};

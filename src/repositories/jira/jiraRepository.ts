import { eq } from "drizzle-orm";
import { db } from "@/db";
import { jiraAccounts } from "@/db/schemas";

const createJiraAccount = async (userId: string, jiraAccountId: string) => {
	const result = await db.insert(jiraAccounts).values({
		userId,
		jiraAccountId,
	});

	return result;
};

const getJiraAccount = async (userId: string) => {
	const result = await db.query.jiraAccounts.findFirst({
		where: eq(jiraAccounts.userId, userId),
	});

	return result;
};

export const jiraRepository = {
	createJiraAccount,
	getJiraAccount,
};

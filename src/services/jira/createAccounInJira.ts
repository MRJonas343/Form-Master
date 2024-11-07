"use server";

import { jiraRepository, userRepository } from "@/repositories";

export const createAccountInJira = async (userId: number) => {
	const user = await userRepository.findUserById(userId);

	if (!user) return "ERROR";

	const credentials = `${process.env.JIRA_USERNAME}:${process.env.JIRA_TOKEN}`;

	const encodedCredentials = Buffer.from(credentials).toString("base64");

	const body = {
		userName: user.name,
		emailAddress: user.email,
		notifyViaEmail: true,
		products: ["jira-software"],
	};

	const result = await fetch(`${process.env.JIRA_DOMAIN}/rest/api/3/user`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${encodedCredentials}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await result.json();

	const newUser = await jiraRepository.createJiraAccount(
		userId,
		data.accountId,
	);

	return data.accountId;
};

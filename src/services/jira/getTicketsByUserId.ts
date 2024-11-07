"use server";

import { jiraRepository } from "@/repositories";

export const getTicketsByUserId = async (userId: number) => {
	const account = await jiraRepository.getJiraAccount(userId);

	const credentials = `${process.env.JIRA_USERNAME}:${process.env.JIRA_TOKEN}`;

	const encodedCredentials = Buffer.from(credentials).toString("base64");

	const response = await fetch(
		`${process.env.JIRA_DOMAIN}/rest/api/3/search?jql=reporter="${account?.jiraAccountId}"&fields=summary,description,status,priority`,
		{
			method: "GET",
			headers: {
				Authorization: `Basic ${encodedCredentials}`,
				"Content-Type": "application/json",
			},
		},
	);

	const data = await response.json();
	return data;
};

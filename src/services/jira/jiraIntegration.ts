"use server";

import { jiraRepository } from "@/repositories";
import { createAccountInJira } from "./createAccounInJira";

export interface jiraTicket {
	summary: string;
	description: string;
	link: string;
	priority: string;
	form?: string;
}

export const createJiraTicket = async (userId: number, data: jiraTicket) => {
	const jiraAccount = await jiraRepository.getJiraAccount(userId);

	const credentials = `${process.env.JIRA_USERNAME}:${process.env.JIRA_TOKEN}`;
	const encodedCredentials = Buffer.from(credentials).toString("base64");

	if (!jiraAccount) {
		const jiraAccountId = await createAccountInJira(userId);

		const result = await fetch(`${process.env.JIRA_DOMAIN}/rest/api/2/issue`, {
			method: "POST",
			headers: {
				Authorization: `Basic ${encodedCredentials}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fields: {
					project: {
						key: "FM",
					},
					summary: data.summary,
					description: data.description,
					issuetype: {
						name: "Ticket",
					},
					reporter: {
						id: jiraAccountId,
					},
					customfield_10042: data.form,
					customfield_10043: data.link,
					customfield_10044: data.priority,
				},
			}),
		});

		if (!result.ok) {
			const data = await result.json();
			console.error("Error while creating the jira ticket:", data);
			return "ERROR";
		}

		return "SUCCESS";
	}

	const result = await fetch(`${process.env.JIRA_DOMAIN}/rest/api/2/issue`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${encodedCredentials}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			fields: {
				project: {
					key: "FM",
				},
				summary: data.summary,
				description: data.description,
				issuetype: {
					name: "Ticket",
				},
				reporter: {
					id: jiraAccount.jiraAccountId,
				},
				customfield_10042: data.form,
				customfield_10043: data.link,
				customfield_10044: data.priority,
			},
		}),
	});

	if (!result.ok) {
		const data = await result.json();
		console.error("Error while creating the jira ticket:", data);
		return "ERROR";
	}

	return "SUCCESS";
};

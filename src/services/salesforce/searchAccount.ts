"use server";

import { tokenRepository } from "@/repositories";
import { getAccessToken } from "./getAccessToken";

export const searchContactByEmail = async (email: string) => {
	const token = await tokenRepository.getToken();

	if (!token) {
		const newToken = await getAccessToken();
		await tokenRepository.createToken(newToken);
	}

	const query = `SELECT Id, AccountId FROM Contact WHERE Email = '${email}'`;
	const salesforceUrl = `${process.env.SALESFORCE_URL}/query/?q=${encodeURIComponent(query)}`;

	const response = await fetch(salesforceUrl, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const newToken = await getAccessToken();
		await tokenRepository.updateToken(newToken);

		const retryResponse = await fetch(salesforceUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${newToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!retryResponse.ok) {
			const error = await retryResponse.json();
			console.error("Error while searching the contact in Salesforce:", error);
			return "ERROR";
		}

		const data = await retryResponse.json();
		return data.records;
	}

	const data = await response.json();
	return data.records;
};

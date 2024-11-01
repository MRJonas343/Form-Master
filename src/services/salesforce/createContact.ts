"use server";

import type { SalesForceContact } from "@/interfaces/SalesForceAccount";
import { tokenRepository } from "@/repositories";
import { getAccessToken } from "./getAccessToken";

export const createContact = async (data: SalesForceContact) => {
	let token = await tokenRepository.getToken();

	if (!token) {
		const newToken = await getAccessToken();
		await tokenRepository.createToken(newToken);
		token = newToken;
	}

	const salesforceUrl = `${process.env.SALESFORCE_URL}/sobjects/Contact/`;

	const response = await fetch(salesforceUrl, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token?.access_token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const newToken = await getAccessToken();
		await tokenRepository.updateToken(newToken);

		const retryResponse = await fetch(salesforceUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${newToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!retryResponse.ok) {
			const error = await retryResponse.json();
			console.error("Error while creating the contact in Salesforce:", error);
			return "ERROR";
		}

		return "SUCCESS";
	}

	return "SUCCESS";
};

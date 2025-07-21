"use server";

import type { SalesForceContact } from "@/interfaces/SalesForceAccount";
// import { tokenRepository } from "@/repositories"; // TEMPORARILY DISABLED
// import { getAccessToken } from "./getAccessToken"; // TEMPORARILY DISABLED

export const createContact = async (data: SalesForceContact) => {
	// TEMPORARILY MOCKED - Salesforce integration disabled
	console.log("🔧 MOCK: createContact called with data:", data);

	// Simulate some processing time
	await new Promise((resolve) => setTimeout(resolve, 300));

	// Always return success for now
	return "SUCCESS";

	/* ORIGINAL CODE TEMPORARILY DISABLED
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
	*/
};

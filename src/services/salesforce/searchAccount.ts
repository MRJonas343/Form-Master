"use server";

import type { SalesForceUser } from "@/interfaces/SalesForceAccount";
// import { tokenRepository } from "@/repositories"; // TEMPORARILY DISABLED
// import { getAccessToken } from "./getAccessToken"; // TEMPORARILY DISABLED

export const searchContactByEmail = async (
	email: string,
): Promise<SalesForceUser[]> => {
	// TEMPORARILY MOCKED - Salesforce integration disabled
	console.log("🔧 MOCK: searchContactByEmail called for email:", email);

	// Simulate some processing time
	await new Promise((resolve) => setTimeout(resolve, 200));

	// Return mock user data structure (empty array means no existing contact)
	// You can change this to return a mock user if you want to test the "already registered" flow
	return [];

	/* ORIGINAL CODE TEMPORARILY DISABLED
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
	*/
};

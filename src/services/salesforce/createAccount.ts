"use server";

import type { SalesForceAccount } from "@/interfaces/SalesForceAccount";
import { tokenRepository, userRepository } from "@/repositories";
// import { createContact } from "./createContact"; // TEMPORARILY DISABLED
// import { getAccessToken } from "./getAccessToken"; // TEMPORARILY DISABLED

export const createAccount = async (
	userId: string,
	data: SalesForceAccount,
) => {
	// TEMPORARILY MOCKED - Salesforce integration disabled
	console.log("🔧 MOCK: createAccount called for userId:", userId, "data:", data);

	// Simulate some processing time
	await new Promise(resolve => setTimeout(resolve, 500));

	// Always return success for now
	return "SUCCESS";

	/* ORIGINAL CODE TEMPORARILY DISABLED
	const user = await userRepository.findUserById(Number.parseInt(userId));

	if (!user) return console.error("User not found");

	let token = await tokenRepository.getToken();

	if (!token) {
		const newToken = await getAccessToken();
		const result = await tokenRepository.createToken(newToken);
		token = newToken;
	}

	const salesforceUrl = `${process.env.SALESFORCE_URL}/sobjects/Account/`;

	const account = {
		Phone: data.phone,
		BillingCountry: data.country,
		Name: user.name,
		Site: "https://formmaster.site",
	};

	const response = await fetch(salesforceUrl, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token?.access_token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(account),
	});

	if (!response.ok) {
		const newToken = await getAccessToken();
		const result = await tokenRepository.updateToken(newToken);

		const retryResponse = await fetch(salesforceUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${newToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(account),
		});

		if (!retryResponse.ok) {
			const error = await retryResponse.json();
			console.error("Error while creating the account in Salesforce:", error);
			return "ERROR";
		}

		return "SUCCESS";
	}

	const result = await response.json();

	const contactData = {
		FirstName: user.name,
		Email: user.email,
		Phone: data.phone,
		AccountId: result.id,
		LastName: "_",
		Title: "FormMaster User",
	};

	const contactResult = await createContact(contactData);

	return "SUCCESS";
	*/
};

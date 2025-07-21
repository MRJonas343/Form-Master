"use server";

export const getAccessToken = async () => {
	// TEMPORARILY MOCKED - Salesforce integration disabled
	console.log("🔧 MOCK: getAccessToken called - returning mock token");

	// Return mock token structure
	return "mock_salesforce_access_token_12345";

	/* ORIGINAL CODE TEMPORARILY DISABLED
	const formData = new FormData();
	formData.append("grant_type", process.env.SALESFORCE_GRANT_TYPE ?? "");
	formData.append("client_id", process.env.SALESFORCE_ID ?? "");
	formData.append("client_secret", process.env.SALESFORCE_SECRET ?? "");
	formData.append("username", process.env.SALESFORCE_USERNAME ?? "");
	formData.append("password", process.env.SALESFORCE_PASSWORD ?? "");

	const response = await fetch(
		"https://login.salesforce.com/services/oauth2/token",
		{
			method: "POST",
			body: formData,
		},
	);

	if (!response.ok) console.error("Error fetching access token:", response);

	const data = await response.json();

	return data.access_token;
	*/
};

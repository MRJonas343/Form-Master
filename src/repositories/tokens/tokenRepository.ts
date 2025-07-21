import { db } from "@/db";
import { salesForceTokens } from "@/db/schemas";

const getToken = async () => {
	const result = await db.query.salesForceTokens.findFirst();
	return result;
};

const createToken = async (token: string) => {
	const result = await db.insert(salesForceTokens).values({
		access_token: token,
	});

	return result;
};

const updateToken = async (token: string) => {
	const result = await db.update(salesForceTokens).set({ access_token: token });

	return result;
};

export const tokenRepository = {
	getToken,
	createToken,
	updateToken,
};

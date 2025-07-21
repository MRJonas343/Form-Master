"use server";

import { userRepository } from "@/repositories";

export const getUserById = async (id: string) => {
	const result = await userRepository.findUserById(id);

	if (!result) return;

	const user = {
		id: result.id,
		name: result.name,
		email: result.email,
	};

	return user;
};

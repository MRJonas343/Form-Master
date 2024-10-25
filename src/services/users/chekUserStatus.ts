"use server";

import { userRepository } from "@/repositories";

export const chekUserStatus = async (userId: number) => {
	const user = await userRepository.findUserById(userId);

	if (!user) return "USER_NOT_EXISTS";

	return user.status;
};

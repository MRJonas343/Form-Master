"use server";

import { validateNewUserData } from "@/validators";
import { hashPassword } from "@/utils/password";
import { userRepository } from "@/repositories";
import { signIn } from "@/auth";

export const createUser = async (
	name: string,
	email: string,
	password: string,
) => {
	try {
		const validatedUser = validateNewUserData.safeParse({
			name,
			email,
			password,
		});

		if (!validatedUser.success) return "INVALID_CREDENTIALS";

		const isEmailAlreadyInUse = await userRepository.findUserByEmail(email);

		if (isEmailAlreadyInUse) return "USER_EXISTS";

		const hashedPassword = await hashPassword(password);

		const result = await userRepository.createUser({
			name,
			email,
			hashedPassword,
		});

		if (result[0].affectedRows === 0) return "ERROR";

		// Use the generated UUID instead of insertId
		await signIn("credentials", {
			id: result.userId,
			name,
			email,
			role: "user",
			redirect: false,
		});

		return "SUCCESS";
	} catch (error) {
		return "ERROR";
	}
};

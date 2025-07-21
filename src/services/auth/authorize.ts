"use server";

import { signIn } from "@/auth";
import { userRepository } from "@/repositories";
import { comparePassword } from "@/utils/password";

export const authorize = async (email: string, password: string) => {
	try {
		const user = await userRepository.findUserByEmail(email);

		if (!user || !user.password) return "USER_NOT_EXISTS";

		if (user.status === "blocked") return "USER_BLOCKED";

		const isPasswordCorrect = await comparePassword(password, user.password);

		if (!isPasswordCorrect) return "INVALID_PASSWORD";

		await signIn("credentials", {
			id: user.id.toString(),
			name: user.name,
			email,
			role: user.role,
			redirect: false,
		});

		return "SUCCESS";
	} catch (error) {
		//@ts-ignore
		if (error.type === "CredentialsSignin") {
			return "ERRORLOGIN";
		}

		return "ERROR";
	}
};

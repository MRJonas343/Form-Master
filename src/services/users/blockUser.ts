"use server";

import { revalidatePath } from "next/cache";
import { userRepository } from "@/repositories";

export const blockUser = async (usersIds: string[] | "all") => {
	if (usersIds === "all") {
		await userRepository.blockAllUsers();
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}

	if (usersIds.length === 1) {
		await userRepository.blockUser(usersIds[0]);
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}

	if (usersIds.length > 1) {
		await userRepository.blockSomeUsers(usersIds);
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}
};

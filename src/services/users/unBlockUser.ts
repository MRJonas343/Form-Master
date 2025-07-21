"use server";

import { userRepository } from "@/repositories";
import { revalidatePath } from "next/cache";

export const unBlockUser = async (usersIds: string[] | "all") => {
	if (usersIds === "all") {
		await userRepository.unblockAllUsers();
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}

	if (usersIds.length === 1) {
		await userRepository.unblockUser(usersIds[0]);
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}

	if (usersIds.length > 1) {
		await userRepository.unblockSomeUsers(usersIds);
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}
};

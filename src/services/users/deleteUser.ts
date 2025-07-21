"use server";

import { userRepository } from "@/repositories";
import { revalidatePath } from "next/cache";

export const deleteUser = async (usersIds: string[] | "all") => {
	if (usersIds === "all") {
		await userRepository.deleteAllUsers();
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}

	if (usersIds.length === 1) {
		await userRepository.deleteUser(usersIds[0]);
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}

	if (usersIds.length > 1) {
		await userRepository.deleteSomeUsers(usersIds);
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}
};

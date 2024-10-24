"use server";

import { userRepository } from "@/repositories";
import { revalidatePath } from "next/cache";

export const blockUser = async (usersIds: number[] | "all") => {
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

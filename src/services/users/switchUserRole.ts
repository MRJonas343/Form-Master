"use server";

import { userRepository } from "@/repositories";
import { revalidatePath } from "next/cache";

export const switchUserRole = async (usersIds: string[] | "all") => {
	if (usersIds === "all") {
		await userRepository.switchAllUsersRole();
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}

	if (usersIds.length === 1) {
		await userRepository.switchUserRole(usersIds[0]);
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}

	if (usersIds.length > 1) {
		await userRepository.switchSomeUsersRole(usersIds);
		revalidatePath("/admin/panel");
		return "SUCCESS";
	}
};

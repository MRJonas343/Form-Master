"use server";

import { permissionRepository } from "@/repositories";

export const checkPermission = async (formId: number, userId: string) => {
	const result = await permissionRepository.getPermission(formId, userId);

	if (result) return true;

	return false;
};

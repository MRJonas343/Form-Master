"use server";

import { setPermissions, getImageUrl } from "@/utils";
import type { FormSettings, UserType } from "@/interfaces";
import { formRepository } from "@/repositories";
import { validateNewForm } from "@/validators";
import "dotenv/config";

export const createForm = async (
	data: FormSettings,
	userId: number,
	users: UserType[],
	imageInForm?: FormData,
) => {
	const isNewFormValid = validateNewForm.safeParse(data);

	if (!isNewFormValid.success) return "INVALID_FORM";

	const imageUrl = await getImageUrl(imageInForm);

	const formId = await formRepository.createForm(data, userId, imageUrl);

	if (data.isPublic) await setPermissions(formId, users);

	return formId;
};

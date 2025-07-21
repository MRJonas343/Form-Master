"use server";

import type { FormSettings, UserType } from "@/interfaces";
import { formRepository } from "@/repositories";
import { getImageUrl, setPermissions } from "@/utils";
import { validateNewForm } from "@/validators";
import "dotenv/config";

export const createForm = async (
	data: FormSettings,
	userId: string,
	users: UserType[],
	imageInForm?: FormData,
) => {
	const isNewFormValid = validateNewForm.safeParse(data);

	if (!isNewFormValid.success) return "INVALID_FORM";

	const imageUrl = await getImageUrl(imageInForm);

	const formId = await formRepository.createForm(data, userId, imageUrl);

	if (!data.isPublic && users.length > 0) await setPermissions(formId, users);

	return formId;
};

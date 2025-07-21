"use server";

import { revalidatePath } from "next/cache";
import type { FormSettingsToUpdate } from "@/interfaces";
import {
	editFormRepository,
	permissionRepository,
	tagsRepository,
} from "@/repositories";
import { uploadImage } from "@/utils";
import { deleteImage } from "@/utils/deleteImage";

export const updateFormSetting = async (
	formId: number,
	data: FormSettingsToUpdate,
	imageInForm?: FormData,
) => {
	const keysToUpdate = {};
	let newImageKey: string | null = null;

	if (imageInForm?.has("image")) {
		const imageKey = await editFormRepository.getPrevImage(formId);
		if (imageKey) {
			const result = await deleteImage(imageKey);
			if (result === "ERROR") return;
		}

		const image = imageInForm.get("image") as File;
		newImageKey = await uploadImage(image);
	}

	if (data.title) {
		Object.assign(keysToUpdate, { title: data.title });
	}

	if (data.topic) {
		Object.assign(keysToUpdate, { topic: data.topic });
	}

	if (data.otherTopic) {
		Object.assign(keysToUpdate, { topic: data.otherTopic });
	}

	if (data.description) {
		Object.assign(keysToUpdate, { description: data.description });
	}

	if (typeof data.isPublic !== "undefined") {
		Object.assign(keysToUpdate, { isPublic: data.isPublic });
	}

	if (newImageKey) {
		Object.assign(keysToUpdate, { imageUrl: newImageKey });
	}

	if (data.tagsToAdd) {
		const tags = data.tagsToAdd.map((tag) => ({
			form_id: formId,
			tag_id: tag,
		}));

		await tagsRepository.insertTagsByFormId(formId, tags);
	}

	if (data.tagsToDelete) {
		const tags = data.tagsToDelete.map((tag) => ({
			form_id: formId,
			tag_id: tag,
		}));

		await tagsRepository.deleteTagsByFormId(formId, tags);
	}

	if (data.usersToAdd) {
		const permissions = data.usersToAdd.map((userId) => ({
			form_id: formId,
			user_id: userId,
		}));

		await permissionRepository.createPermissions(permissions);
	}

	if (data.usersToRemove) {
		await permissionRepository.deletePermissions(formId, data.usersToRemove);
	}

	revalidatePath(`/dashboard/edit-form/${formId}`);

	return "SUCCESS";
};

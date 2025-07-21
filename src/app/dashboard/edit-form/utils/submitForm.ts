import type { MutableRefObject } from "react";
import toast from "react-hot-toast";
import type { NewFormSettingsType, UserType } from "@/interfaces";
import type {
	FormGeneralData,
	UsersWithPermission,
} from "@/interfaces/formDataToUpdate";
import { updateFormSetting } from "@/services/edit-form/updateFormSetting";
import type { FormSettingsState } from "../store/state";

export const onSubmit = async (
	data: NewFormSettingsType,
	initialData: MutableRefObject<FormGeneralData>,
	state: FormSettingsState,
) => {
	const dataToUpdate = {};
	const imageInForm = new FormData();

	if (data.title !== initialData.current.form.title) {
		Object.assign(dataToUpdate, { title: data.title });
	}

	if (data.topic !== initialData.current.form.topic) {
		Object.assign(dataToUpdate, { topic: data.topic });
	}

	if (data.otherTopic) {
		Object.assign(dataToUpdate, { otherTopic: data.otherTopic });
	}

	if (data.description !== initialData.current.form.description) {
		Object.assign(dataToUpdate, { description: data.description });
	}

	if (state.image) {
		imageInForm.append("image", state.image);
	}

	if (data.isPublic !== initialData.current.form.isPublic) {
		Object.assign(dataToUpdate, { isPublic: data.isPublic });
	}

	const prevTagsIds = initialData.current.form.tags.map((tagObj) => tagObj.id);
	const newTagsIds = data.tags[0]
		? data.tags.map((tag) => Number.parseInt(tag))
		: [];

	const tagsAreEqual =
		newTagsIds.length > 0 &&
		newTagsIds.every((value, index) => {
			return value === prevTagsIds[index];
		});

	if (!tagsAreEqual) {
		const removedTags = prevTagsIds.filter((id) => !newTagsIds.includes(id));
		const addedTags = newTagsIds.filter((id) => !prevTagsIds.includes(id));

		if (removedTags.length > 0) {
			Object.assign(dataToUpdate, { tagsToDelete: removedTags });
		}

		if (addedTags.length > 0) {
			Object.assign(dataToUpdate, {
				tagsToAdd: addedTags,
			});
		}
	}

	if (!data.isPublic) {
		const selectedUserIds = state.selectedUsers.map(
			(user: UserType) => user.id,
		);

		const initialUserIds = initialData.current.usersWithPermissions.map(
			(user: UsersWithPermission) => user.id,
		);

		const addedUsers = selectedUserIds.filter(
			(id) => !initialUserIds.includes(id),
		);
		const removedUsers = initialUserIds.filter(
			(id) => !selectedUserIds.includes(id),
		);

		if (addedUsers.length > 0 || removedUsers.length > 0) {
			if (addedUsers.length > 0) {
				Object.assign(dataToUpdate, { usersToAdd: addedUsers });
			}

			if (removedUsers.length > 0) {
				Object.assign(dataToUpdate, { usersToRemove: removedUsers });
			}
		}
	}

	if (Object.keys(dataToUpdate).length === 0 && !state.image) {
		return toast("No changes made");
	}

	const result = await updateFormSetting(
		initialData.current.form.id,
		dataToUpdate,
		imageInForm,
	);

	if (result) toast.success("Form updated successfully");

	return result;
};

import type { Key, SetStateAction } from "react";
import toast from "react-hot-toast";
import type { Users } from "@/interfaces";
import { unBlockUser } from "@/services/users/unBlockUser";

export const handleUnlockUser = async (
	selectedIds: Set<Key> | "all",
	users: Users[],
	setUsers: (value: SetStateAction<Users[]>) => void,
) => {
	//case all users change role
	if (selectedIds === "all") {
		const result = await unBlockUser("all");
		if (result === "SUCCESS") toast.success("Users unlocked successfully");
		setUsers(
			users.map((user) => ({
				...user,
				status: "active",
			})),
		);
		return;
	}
	const ids = [...selectedIds].map((id) => id as string);
	if (ids.length === 0) return toast.error("No users selected");

	//case some users change role
	const result = await unBlockUser(ids);
	if (result === "SUCCESS") toast.success("Users unlocked successfully");

	const usersUpdated = users.map((user) => {
		if (ids.includes(user.id)) {
			return {
				...user,
				status: "active",
			};
		}
		return user;
	});
	setUsers(usersUpdated);
};

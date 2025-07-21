import type { Key, SetStateAction } from "react";
import toast from "react-hot-toast";
import type { Users } from "@/interfaces";
import { deleteUser } from "@/services/users/deleteUser";

export const handleDeleteUser = async (
	selectedIds: Set<Key> | "all",
	users: Users[],
	setUsers: (value: SetStateAction<Users[]>) => void,
) => {
	//case all users change role
	if (selectedIds === "all") {
		const result = await deleteUser("all");
		if (result === "SUCCESS") toast.success("Users deleted successfully");
		setUsers([]);
		return;
	}
	const ids = [...selectedIds].map((id) => id as string);
	if (ids.length === 0) return toast.error("No users selected");

	//case some users change role
	const result = await deleteUser(ids);
	if (result === "SUCCESS") toast.success("Users deleted successfully");

	const usersUpdated = users.filter((user) => !ids.includes(user.id));
	setUsers(usersUpdated);
};

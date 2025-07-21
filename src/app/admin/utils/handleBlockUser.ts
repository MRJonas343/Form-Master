import type { Users } from "@/interfaces";
import { blockUser } from "@/services/users/blockUser";

import type { Key, SetStateAction } from "react";
import toast from "react-hot-toast";

export const handleBlockUser = async (
	selectedIds: Set<Key> | "all",
	users: Users[],
	setUsers: (value: SetStateAction<Users[]>) => void,
) => {
	//case all users change role
	if (selectedIds === "all") {
		const result = await blockUser("all");
		if (result === "SUCCESS") toast.success("Users blocked successfully");
		setUsers(
			users.map((user) => ({
				...user,
				status: "blocked",
			})),
		);
		return;
	}
	const ids = [...selectedIds].map((id) => Number.parseInt(id as string));
	if (ids.length === 0) return toast.error("No users selected");

	//case some users change role
	const result = await blockUser(ids);
	if (result === "SUCCESS") toast.success("Users blocked successfully");

	const usersUpdated = users.map((user) => {
		if (ids.includes(user.id)) {
			return {
				...user,
				status: "blocked",
			};
		}
		return user;
	});
	setUsers(usersUpdated);
};

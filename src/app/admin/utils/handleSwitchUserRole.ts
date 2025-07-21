import type { Users } from "@/interfaces";
import { switchUserRole } from "@/services/users/switchUserRole";
import type { Key, SetStateAction } from "react";
import toast from "react-hot-toast";

export const handleSwitchUserRole = async (
	selectedIds: Set<Key> | "all",
	users: Users[],
	setUsers: (value: SetStateAction<Users[]>) => void,
) => {
	//case all users change role
	if (selectedIds === "all") {
		const result = await switchUserRole("all");
		if (result === "SUCCESS") toast.success("Role switched successfully");
		setUsers(
			users.map((user) => ({
				...user,
				role: user.role === "admin" ? "user" : "admin",
			})),
		);
		return;
	}
	const ids = [...selectedIds].map((id) => Number.parseInt(id as string));
	if (ids.length === 0) return toast.error("No users selected");

	//case some users change role
	const result = await switchUserRole(ids);
	if (result === "SUCCESS") toast.success("Role switched successfully");

	const usersUpdated = users.map((user) => {
		if (ids.includes(user.id)) {
			return { ...user, role: user.role === "admin" ? "user" : "admin" };
		}
		return user;
	});
	setUsers(usersUpdated);
};

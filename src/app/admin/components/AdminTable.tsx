"use client";

import {
	Button,
	getKeyValue,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type Key, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { Users } from "@/interfaces";
import {
	handleBlockUser,
	handleDeleteUser,
	handleSwitchUserRole,
	handleUnlockUser,
} from "../utils";

export const AdminTable = ({ data }: { data: Users[] }) => {
	const selectedIdsRef = useRef<Set<Key> | "all">(new Set<Key>());
	const [users, setUsers] = useState<Users[]>(data);

	const router = useRouter();

	const t = useTranslations("adminPanel");

	const handleSelectionChange = (keys: "all" | Set<Key>) => {
		selectedIdsRef.current = keys === "all" || keys.size > 0 ? keys : new Set();
	};

	const handleSeeForms = () => {
		if (selectedIdsRef.current === "all")
			return toast.error("Just one user at a time");
		const id = [...selectedIdsRef.current];
		if (id.length === 0) return toast.error("No users selected");
		if (id.length > 1) return toast.error("Just one user at a time");
		router.push(`/admin/form/${id[0]}`);
	};

	const columns = [
		{ key: "id", label: t("id") },
		{ key: "name", label: t("name") },
		{ key: "email", label: t("email") },
		{ key: "role", label: t("role") },
		{ key: "status", label: t("status") },
	];

	return (
		<>
			<h1 className="text-center mt-6 text-xl sm:text-2xl md:text-3xl font-semibold">
				{t("adminTable")} 🚀
			</h1>
			<div className="w-[95%] flex justify-end gap-2 mt-3 mx-auto max-w-[1280px]">
				<Button
					radius="sm"
					onClick={() =>
						handleSwitchUserRole(selectedIdsRef.current, data, setUsers)
					}
					color="primary"
					variant="flat"
					className="font-semibold"
				>
					{t("switchRole")}
				</Button>
				<Button
					radius="sm"
					onClick={() => handleSeeForms()}
					color="primary"
					variant="flat"
					className="font-semibold"
				>
					{t("forms")}
				</Button>

				<Button
					color="primary"
					variant="flat"
					radius="sm"
					onClick={() =>
						handleBlockUser(selectedIdsRef.current, data, setUsers)
					}
					isIconOnly
				>
					<FaLock size={16} />
				</Button>
				<Button
					color="primary"
					variant="flat"
					radius="sm"
					onClick={() =>
						handleUnlockUser(selectedIdsRef.current, data, setUsers)
					}
					isIconOnly
				>
					<FaUnlock size={16} />
				</Button>

				<Button
					radius="sm"
					onClick={() =>
						handleDeleteUser(selectedIdsRef.current, data, setUsers)
					}
					color="danger"
					variant="flat"
					isIconOnly
				>
					<MdDelete size={20} />
				</Button>
			</div>
			<div className="w-full flex justify-center mt-5">
				<Table
					className="w-[95%] max-w-[1280px]"
					aria-label="Admin Table"
					onSelectionChange={handleSelectionChange}
					radius="lg"
					color="primary"
					selectionMode="multiple"
				>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn key={column.key}>{column.label}</TableColumn>
						)}
					</TableHeader>
					<TableBody emptyContent="No users to display." items={users}>
						{(row) => (
							<TableRow key={row.id}>
								{(columnKey) => (
									<TableCell>{getKeyValue(row, columnKey)}</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

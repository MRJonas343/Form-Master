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
			<h1 className="mt-6 text-center font-semibold text-xl sm:text-2xl md:text-3xl">
				{t("adminTable")} 🚀
			</h1>
			<div className="mx-auto mt-3 flex w-[95%] max-w-[1280px] justify-end gap-2">
				<Button
					className="font-semibold"
					color="primary"
					onClick={() =>
						handleSwitchUserRole(selectedIdsRef.current, data, setUsers)
					}
					radius="sm"
					variant="flat"
				>
					{t("switchRole")}
				</Button>
				<Button
					className="font-semibold"
					color="primary"
					onClick={() => handleSeeForms()}
					radius="sm"
					variant="flat"
				>
					{t("forms")}
				</Button>

				<Button
					color="primary"
					isIconOnly
					onClick={() =>
						handleBlockUser(selectedIdsRef.current, data, setUsers)
					}
					radius="sm"
					variant="flat"
				>
					<FaLock size={16} />
				</Button>
				<Button
					color="primary"
					isIconOnly
					onClick={() =>
						handleUnlockUser(selectedIdsRef.current, data, setUsers)
					}
					radius="sm"
					variant="flat"
				>
					<FaUnlock size={16} />
				</Button>

				<Button
					color="danger"
					isIconOnly
					onClick={() =>
						handleDeleteUser(selectedIdsRef.current, data, setUsers)
					}
					radius="sm"
					variant="flat"
				>
					<MdDelete size={20} />
				</Button>
			</div>
			<div className="mt-5 flex w-full justify-center">
				<Table
					aria-label="Admin Table"
					className="w-[95%] max-w-[1280px]"
					color="primary"
					onSelectionChange={handleSelectionChange}
					radius="lg"
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

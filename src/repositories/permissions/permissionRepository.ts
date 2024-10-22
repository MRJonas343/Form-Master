import { db } from "@/db";
import { formPermissions, users } from "@/db/schemas";
import { and, eq } from "drizzle-orm";

type Permission = {
	form_id: number;
	user_id: number;
};

const createPermissions = async (permissions: Permission[]) => {
	const result = await db.insert(formPermissions).values(permissions);
	return result;
};

const getPermission = async (formId: number, userId: number) => {
	const result = await db.query.formPermissions.findFirst({
		where: and(
			eq(formPermissions.form_id, formId),
			eq(formPermissions.user_id, userId),
		),
	});

	return result;
};

const getUsersWithPermissions = async (formId: number) => {
	const result = await db
		.select({
			id: users.id,
			name: users.name,
			email: users.email,
		})
		.from(users)
		.innerJoin(formPermissions, eq(formPermissions.user_id, users.id))
		.where(eq(formPermissions.form_id, formId));

	return result;
};

export const permissionRepository = {
	getUsersWithPermissions,
	getPermission,
	createPermissions,
};

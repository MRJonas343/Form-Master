import type { User } from "@/interfaces";
import { users } from "@/db/schemas";
import { db } from "@/db";
import { like, eq, inArray } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const createUser = async (user: User) => {
	const userId = uuidv4();
	const result = await db.insert(users).values({
		id: userId,
		name: user.name,
		email: user.email,
		password: user.hashedPassword,
		role: "user",
		status: "active",
	});

	return { ...result, userId };
};

const findUserByEmail = async (email: string) => {
	const result = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	return result;
};

const findUserById = async (id: string) => {
	const result = await db.query.users.findFirst({
		where: eq(users.id, id),
	});

	return result;
};

const checkUserStatus = async (userId: string) => {
	const result = await db
		.select({
			status: users.status,
		})
		.from(users)
		.where(eq(users.id, userId));

	return result;
};

const findUserByName = async (name: string) => {
	const result = await db.query.users.findFirst({
		where: eq(users.name, name),
	});

	return result;
};

const deleteUserById = async (id: string) => {
	const result = await db.delete(users).where(eq(users.id, id));

	return result;
};

const findUsersByName = async (name: string) => {
	const result = await db
		.select({
			id: users.id,
			name: users.name,
			email: users.email,
		})
		.from(users)
		.where(like(users.name, `%${name}%`))
		.limit(10);

	return result;
};

const findUsersByEmail = async (email: string) => {
	const result = await db
		.select({
			id: users.id,
			name: users.name,
			email: users.email,
		})
		.from(users)
		.where(like(users.email, `%${email}%`))
		.limit(10);

	return result;
};

const findAllUsers = async () => {
	const result = await db
		.select({
			id: users.id,
			name: users.name,
			email: users.email,
			role: users.role,
			status: users.status,
		})
		.from(users);

	return result;
};

const switchUserRole = async (usersId: string) => {
	await db.transaction(async (tx) => {
		const user = await tx.query.users.findFirst({
			where: eq(users.id, usersId),
		});

		if (!user) return;

		if (user.role === "admin") {
			await tx.update(users).set({ role: "user" }).where(eq(users.id, usersId));
		} else {
			await tx
				.update(users)
				.set({ role: "admin" })
				.where(eq(users.id, usersId));
		}
	});

	return "SUCCESS";
};

const switchSomeUsersRole = async (usersIds: string[]) => {
	await db.transaction(async (tx) => {
		const usersData = await tx.query.users.findMany({
			where: inArray(users.id, usersIds),
		});

		for (const user of usersData) {
			if (user.role === "admin") {
				await tx
					.update(users)
					.set({ role: "user" })
					.where(eq(users.id, user.id));
			} else {
				await tx
					.update(users)
					.set({ role: "admin" })
					.where(eq(users.id, user.id));
			}
		}
	});

	return "SUCCESS";
};

const switchAllUsersRole = async () => {
	await db.transaction(async (tx) => {
		const usersData = await tx.query.users.findMany();

		for (const user of usersData) {
			if (user.role === "admin") {
				await tx
					.update(users)
					.set({ role: "user" })
					.where(eq(users.id, user.id));
			} else {
				await tx
					.update(users)
					.set({ role: "admin" })
					.where(eq(users.id, user.id));
			}
		}
	});
};

const blockUser = async (userId: string) => {
	await db.transaction(async (tx) => {
		const user = await tx.query.users.findFirst({
			where: eq(users.id, userId),
		});

		if (!user) return;

		await tx
			.update(users)
			.set({ status: "blocked" })
			.where(eq(users.id, userId));
	});

	return "SUCCESS";
};

const blockSomeUsers = async (usersIds: string[]) => {
	await db.transaction(async (tx) => {
		const usersData = await tx.query.users.findMany({
			where: inArray(users.id, usersIds),
		});

		for (const user of usersData) {
			await tx
				.update(users)
				.set({ status: "blocked" })
				.where(eq(users.id, user.id));
		}
	});

	return "SUCCESS";
};

const blockAllUsers = async () => {
	await db.transaction(async (tx) => {
		const usersData = await tx.query.users.findMany();

		for (const user of usersData) {
			await tx
				.update(users)
				.set({ status: "blocked" })
				.where(eq(users.id, user.id));
		}
	});
};

const unblockUser = async (userId: string) => {
	await db.transaction(async (tx) => {
		const user = await tx.query.users.findFirst({
			where: eq(users.id, userId),
		});

		if (!user) return;

		await tx
			.update(users)
			.set({ status: "active" })
			.where(eq(users.id, userId));
	});

	return "SUCCESS";
};

const unblockSomeUsers = async (usersIds: string[]) => {
	await db.transaction(async (tx) => {
		const usersData = await tx.query.users.findMany({
			where: inArray(users.id, usersIds),
		});

		for (const user of usersData) {
			await tx
				.update(users)
				.set({ status: "active" })
				.where(eq(users.id, user.id));
		}
	});

	return "SUCCESS";
};

const unblockAllUsers = async () => {
	await db.transaction(async (tx) => {
		const usersData = await tx.query.users.findMany();

		for (const user of usersData) {
			await tx
				.update(users)
				.set({ status: "active" })
				.where(eq(users.id, user.id));
		}
	});
};

const deleteUser = async (userId: string) => {
	await db.transaction(async (tx) => {
		const user = await tx.query.users.findFirst({
			where: eq(users.id, userId),
		});

		if (!user) return;

		await tx.delete(users).where(eq(users.id, userId));
	});

	return "SUCCESS";
};

const deleteSomeUsers = async (usersIds: string[]) => {
	await db.transaction(async (tx) => {
		const usersData = await tx.query.users.findMany({
			where: inArray(users.id, usersIds),
		});

		for (const user of usersData) {
			await tx.delete(users).where(eq(users.id, user.id));
		}
	});

	return "SUCCESS";
};

const deleteAllUsers = async () => {
	await db.transaction(async (tx) => {
		const usersData = await tx.query.users.findMany();

		for (const user of usersData) {
			await tx.delete(users).where(eq(users.id, user.id));
		}
	});
};

export const userRepository = {
	createUser,
	findUserByEmail,
	findUserById,
	findUserByName,
	deleteUserById,
	findUsersByName,
	findUsersByEmail,
	findAllUsers,
	switchUserRole,
	switchSomeUsersRole,
	switchAllUsersRole,
	blockUser,
	blockSomeUsers,
	blockAllUsers,
	unblockUser,
	unblockSomeUsers,
	unblockAllUsers,
	deleteUser,
	deleteSomeUsers,
	deleteAllUsers,
};

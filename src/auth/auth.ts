import Credentials from "next-auth/providers/credentials";
import { encode as defaultEncode } from "next-auth/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { userRepository } from "@/repositories";
import { validateUser } from "@/validators";
import { v4 as uuid } from "uuid";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "@/db";
import Discord from "next-auth/providers/discord";
const adapter = DrizzleAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
	secret: process.env.AUTH_SECRET ?? "",
	adapter: adapter,
	pages: {
		signIn: "/login",
	},
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID ?? "",
			clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
			allowDangerousEmailAccountLinking: true,
		}),
		Discord({
			clientId: process.env.AUTH_DISCORD_ID ?? "",
			clientSecret: process.env.AUTH_DISCORD_SECRET ?? "",
			allowDangerousEmailAccountLinking: true,
		}),
		Credentials({
			credentials: {
				id: {},
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const validatedUser = validateUser.safeParse(credentials);

				if (!validatedUser.success) return null;

				const user = {
					id: validatedUser.data.id,
					name: validatedUser.data.name,
					email: validatedUser.data.email,
					role: validatedUser.data.role,
				};

				return user;
			},
		}),
	],

	callbacks: {
		async jwt({ token, user, account }) {
			if (account?.provider === "credentials") {
				token.credentials = true;
				token.id = user.id;
			}

			return token;
		},
		async session({ session }) {
			const user = await userRepository.findUserById(session.user.id);

			Object.assign(session.user, {
				role: user?.role,
				status: user?.status,
			});

			return session;
		},
	},
	jwt: {
		encode: async (params) => {
			if (params.token?.credentials) {
				const sessionToken = uuid();

				if (!params.token.sub) throw new Error("No user ID found in token");

				const createdSession = await adapter?.createSession?.({
					sessionToken: sessionToken,
					userId: params.token.sub.toString(),
					expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				});

				if (!createdSession) throw new Error("Failed to create session");

				return sessionToken;
			}
			return defaultEncode(params);
		},
	},
});

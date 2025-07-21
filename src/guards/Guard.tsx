"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function Guard({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();

	const router = useRouter();

	const signout = async () => {
		await signOut();
	};

	useEffect(() => {
		if (!session) return;

		if (session?.user?.status === "blocked") {
			signout();
		}
	}, [session, router]);

	return <>{children}</>;
}

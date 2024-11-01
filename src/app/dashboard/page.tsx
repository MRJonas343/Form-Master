import {
	getFilledFormsByUser,
	getUserForms,
	searchContactByEmail,
} from "@/services";
import { redirect } from "next/navigation";
import { Dashboard } from "./components";
import { NavBar } from "@/components";
import { auth } from "@/auth";

const page = async () => {
	const session = await auth();

	if (!session) return redirect("/login");

	const [userForms, filledForms, contacts] = await Promise.all([
		getUserForms(Number.parseInt(session?.user?.id ?? "")),
		getFilledFormsByUser(Number.parseInt(session?.user?.id ?? "")),
		searchContactByEmail(session?.user?.email ?? ""),
	]);

	return (
		<>
			<NavBar />
			<Dashboard
				userForms={userForms}
				filledForms={filledForms}
				contacts={contacts[0]}
			/>
		</>
	);
};
export default page;

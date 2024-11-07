import {
	getFilledFormsByUser,
	getUserForms,
	searchContactByEmail,
} from "@/services";
import { redirect } from "next/navigation";
import { Dashboard } from "./components";
import { NavBar } from "@/components";
import { auth } from "@/auth";
import { getTicketsByUserId } from "@/services/jira/getTicketsByUserId";

const page = async () => {
	const session = await auth();

	if (!session) return redirect("/login");

	const [userForms, filledForms, contacts, tickets] = await Promise.all([
		getUserForms(Number.parseInt(session?.user?.id ?? "")),
		getFilledFormsByUser(Number.parseInt(session?.user?.id ?? "")),
		searchContactByEmail(session?.user?.email ?? ""),
		getTicketsByUserId(Number.parseInt(session?.user?.id ?? "")),
	]);

	return (
		<>
			<NavBar />
			<Dashboard
				userForms={userForms}
				filledForms={filledForms}
				contacts={contacts[0]}
				tickets={tickets}
			/>
		</>
	);
};
export default page;

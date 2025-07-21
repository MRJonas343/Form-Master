import { getFilledFormsByUser } from "@/services/forms/getFilledForms";
import { getUserForms } from "@/services/forms/getUserForms";
import { searchContactByEmail } from "@/services/salesforce/searchAccount";
import { redirect } from "next/navigation";
import { Dashboard } from "./components";
import { NavBar } from "@/components";
import { auth } from "@/auth";
import type { IssuesFromJira } from "@/interfaces/IssuesFromJira";
import type { SalesForceUser } from "@/interfaces/SalesForceAccount";
// import { getTicketsByUserId } from "@/services/jira/getTicketsByUserId"; // TEMPORARILY DISABLED

const page = async () => {
	const session = await auth();

	if (!session) return redirect("/login");

	const [userForms, filledForms, contacts] = await Promise.all([
		getUserForms(session?.user?.id ?? ""),
		getFilledFormsByUser(session?.user?.id ?? ""),
		searchContactByEmail(session?.user?.email ?? ""), // RE-ENABLED (now mocked)
		// getTicketsByUserId(session?.user?.id ?? ""), // TEMPORARILY DISABLED
	]);

	// Temporarily provide empty tickets structure until Jira integration is fixed
	const tickets: IssuesFromJira = {
		expand: "",
		startAt: 0,
		maxResults: 0,
		total: 0,
		issues: []
	};

	// Provide fallback for contacts if array is empty (mocked returns empty array)
	const contactData = contacts[0] || null;

	return (
		<>
			<NavBar />
			<Dashboard
				userForms={userForms}
				filledForms={filledForms}
				contacts={contactData}
				tickets={tickets}
			/>
		</>
	);
};
export default page;

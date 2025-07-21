import { NavBar } from "@/components";
import { AdminTable } from "../components/AdminTable";
import { getAllUsers } from "@/services/users/getAllUsers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
	const session = await auth();

	if (!session) return redirect("/login");

	if (session.user.role !== "admin") return redirect("/");

	const users = await getAllUsers();

	return (
		<>
			<NavBar />
			<AdminTable data={users} />
		</>
	);
};
export default page;

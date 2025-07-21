import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import { getAllUsers } from "@/services/users/getAllUsers";
import { AdminTable } from "../components/AdminTable";

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

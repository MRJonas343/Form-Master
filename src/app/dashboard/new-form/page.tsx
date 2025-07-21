import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { NavBar } from "@/components";
import { NewForm } from "../components";

const page = async () => {
	const session = await auth();

	if (!session) return redirect("/login");
	return (
		<>
			<NavBar />
			<NewForm />
		</>
	);
};

export default page;

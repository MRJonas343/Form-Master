import { getPopularForms } from "@/services/forms/getPopularForms";
import { PopularFormsTable } from "./components";

export default async function Page() {
	const popularForms = await getPopularForms();

	return (
		<div className="flex h-[70vh]">
			<PopularFormsTable popularForms={popularForms} />
		</div>
	);
}

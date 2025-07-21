import { getPopularForms } from "@/services/forms/getPopularForms";
import { PopularFormsTable } from "./components";

const page = async () => {
	const popularForms = await getPopularForms();

	return (
		<div className="flex h-[85vh] items-center">
			<PopularFormsTable popularForms={popularForms} />
		</div>
	);
};
export default page;

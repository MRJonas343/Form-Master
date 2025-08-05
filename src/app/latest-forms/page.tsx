import { getLatestForms } from "@/services/forms/getLatestForms";
import MainPage from "./components/MainPage";

const page = async () => {
	const { forms } = await getLatestForms(1, 10);

	return <MainPage cardsData={forms} />;
};
export default page;

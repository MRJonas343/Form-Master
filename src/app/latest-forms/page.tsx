import { getLatestForms } from "@/services/forms/getLatestForms";
import MainPage from "./components/MainPage";

export default async function Page() {
	const { forms } = await getLatestForms(1, 10);

	return <MainPage cardsData={forms} />;
}

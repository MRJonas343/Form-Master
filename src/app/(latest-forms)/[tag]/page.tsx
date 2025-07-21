import { getFormsByTag } from "@/services/forms/getFormsByTag";
import { TagPage } from "../components/TagPage";

const Page = async (props: { params: Promise<{ tag: string }> }) => {
	const params = await props.params;
	const { tag } = params;

	const { forms } = await getFormsByTag(1, 10, tag);

	return (
		<div>
			<TagPage cardsData={forms} tag={tag} />
		</div>
	);
};

export default Page;

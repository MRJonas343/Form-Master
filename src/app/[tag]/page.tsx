import { redirect } from "next/navigation";
import { tabs } from "@/constants/CloudTags";
import { getFormsByTag } from "@/services/forms/getFormsByTag";
import { TagPage } from "../latest-forms/components/TagPage";

const page = async (props: { params: Promise<{ tag: string }> }) => {
	const params = await props.params;
	const { tag } = params;

	const validTags = tabs
		.map((tab) => tab.value)
		.filter((value) => value !== "noKey");
	const isValidTag = validTags.includes(tag);

	if (!isValidTag) redirect("/latest-forms");

	const { forms } = await getFormsByTag(1, 10, tag);

	return (
		<div>
			<TagPage cardsData={forms} tag={tag} />
		</div>
	);
};

export default page;

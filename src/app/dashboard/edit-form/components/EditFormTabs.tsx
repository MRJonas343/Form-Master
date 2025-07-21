import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import type { FC } from "react";

export interface EditFormTabsProps {
	selectedKey: string;
	onSelectionChange: (key: string) => void;
}

export const EditFormTabs: FC<EditFormTabsProps> = ({
	selectedKey,
	onSelectionChange,
}) => {
	const t = useTranslations("createFormTabs");

	return (
		<Tabs
			size="lg"
			radius="sm"
			variant="underlined"
			selectedKey={selectedKey}
			onSelectionChange={(key) => onSelectionChange(key as string)}
			aria-label="Options"
			color="primary"
			className="mt-2 lg:mt-6"
		>
			<Tab
				key="general-settings"
				title={t("generalSettings")}
				className="cursor-default"
			/>
			<Tab
				key="edit-questions"
				title={"Edit Questions"}
				className="cursor-default"
			/>
		</Tabs>
	);
};

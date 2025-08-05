"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import type { FC } from "react";

export interface CreateFormTabsProps {
	selectedKey: string;
}

export const CreateFormTabs: FC<CreateFormTabsProps> = ({ selectedKey }) => {
	const t = useTranslations("createFormTabs");

	return (
		<Tabs
			aria-label="Options"
			className="mt-2 lg:mt-6"
			color="primary"
			radius="sm"
			selectedKey={selectedKey}
			size="lg"
			variant="underlined"
		>
			<Tab
				className="cursor-default"
				key="general-settings"
				title={t("generalSettings")}
			/>
			<Tab
				className="cursor-default"
				key="set-questions"
				title={t("setQuestions")}
			/>
		</Tabs>
	);
};

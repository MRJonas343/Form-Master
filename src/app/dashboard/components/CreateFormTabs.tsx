"use client";

import { Tabs, Tab } from "@nextui-org/react";
import type { FC } from "react";
import { useTranslations } from "next-intl";

export interface CreateFormTabsProps {
	selectedKey: string;
}

export const CreateFormTabs: FC<CreateFormTabsProps> = ({ selectedKey }) => {
	const t = useTranslations("createFormTabs");

	return (
		<Tabs
			size="lg"
			radius="sm"
			variant="underlined"
			selectedKey={selectedKey}
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
				key="set-questions"
				title={t("setQuestions")}
				className="cursor-default"
			/>
		</Tabs>
	);
};

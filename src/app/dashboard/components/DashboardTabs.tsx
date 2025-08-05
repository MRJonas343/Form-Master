"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import type { FC } from "react";

export interface DashboardTabsProps {
	selectedKey: string;
	changeTab: (tab: string) => void;
}

export const DashboardTabs: FC<DashboardTabsProps> = ({
	selectedKey,
	changeTab,
}) => {
	const t = useTranslations("dashboardTabs");

	return (
		<Tabs
			aria-label="Options"
			className="mt-6"
			color="primary"
			defaultSelectedKey="my-forms"
			onSelectionChange={(key) => changeTab(key as string)}
			radius="sm"
			selectedKey={selectedKey}
			size="lg"
			variant="underlined"
		>
			<Tab key="my-forms" title={t("myForms")} />
			<Tab key="my-answers" title={t("myAnswers")} />
		</Tabs>
	);
};

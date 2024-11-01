"use client";

import { Tabs, Tab } from "@nextui-org/react";
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
			size="lg"
			radius="sm"
			variant="underlined"
			defaultSelectedKey="my-forms"
			aria-label="Options"
			selectedKey={selectedKey}
			onSelectionChange={(key) => changeTab(key as string)}
			color="primary"
			className="mt-6"
		>
			<Tab key="my-forms" title={t("myForms")} />
			<Tab key="my-answers" title={t("myAnswers")} />
			<Tab key="join-us" title={t("joinUs")} />
		</Tabs>
	);
};

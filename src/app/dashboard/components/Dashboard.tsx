"use client";

import { useState } from "react";
import type { FilledForm, UserForms } from "@/interfaces";
import type { IssuesFromJira } from "@/interfaces/IssuesFromJira";
import type { SalesForceUser } from "@/interfaces/SalesForceAccount";
import { DashboardTabs, MyFilledForm, MyFormsTable } from ".";
import { Issues } from "./Issues";
import { JoinUsTab } from "./JoinUsTab";

interface DashboardProps {
	userForms: UserForms[];
	filledForms: FilledForm[];
	contacts: SalesForceUser | null; // Made nullable for mocked integration
	tickets: IssuesFromJira;
}

export const Dashboard = ({
	userForms,
	filledForms,
	contacts,
	tickets,
}: DashboardProps) => {
	const [tab, setTab] = useState("my-forms");

	const changeTab = (selectedTab: string) => setTab(selectedTab);

	const renderTabContent = () => {
		if (tab === "my-forms") {
			return <MyFormsTable forms={userForms} />;
		}

		if (tab === "join-us") {
			return <JoinUsTab data={contacts} />;
		}

		if (tab === "my-answers") {
			return <MyFilledForm filledForms={filledForms} />;
		}

		return <Issues tickets={tickets} />;
	};

	return (
		<>
			<div className="flex w-full flex-col px-5 lg:mx-auto lg:max-w-[1280px] lg:flex-row">
				<DashboardTabs
					changeTab={(selectedTab) => changeTab(selectedTab)}
					selectedKey={tab}
				/>
			</div>
			{renderTabContent()}
		</>
	);
};

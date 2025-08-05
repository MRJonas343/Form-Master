"use client";

import { useState } from "react";
import type { FilledForm, UserForms } from "@/interfaces";
import type { IssuesFromJira } from "@/interfaces/IssuesFromJira";
import type { SalesForceUser } from "@/interfaces/SalesForceAccount";
import { DashboardTabs, MyFilledForm, MyFormsTable } from ".";

interface DashboardProps {
	userForms: UserForms[];
	filledForms: FilledForm[];
	contacts: SalesForceUser | null; // Made nullable for mocked integration
	tickets: IssuesFromJira;
}

export const Dashboard = ({ userForms, filledForms }: DashboardProps) => {
	const [tab, setTab] = useState("my-forms");

	const changeTab = (selectedTab: string) => setTab(selectedTab);

	return (
		<>
			<div className="flex w-full flex-col px-5 lg:mx-auto lg:max-w-[1280px] lg:flex-row">
				<DashboardTabs
					changeTab={(selectedTab) => changeTab(selectedTab)}
					selectedKey={tab}
				/>
			</div>
			{tab === "my-forms" && <MyFormsTable forms={userForms} />}
			{tab === "my-answers" && <MyFilledForm filledForms={filledForms} />}
		</>
	);
};

"use client";

import { DashboardTabs, MyFormsTable, MyFilledForm } from ".";
import type { FilledForm, UserForms } from "@/interfaces";
import { JoinUsTab } from "./JoinUsTab";
import { useState } from "react";
import type { SalesForceUser } from "@/interfaces/SalesForceAccount";
import { Issues } from "./Issues";
import type { IssuesFromJira } from "@/interfaces/IssuesFromJira";

interface DashboardProps {
	userForms: UserForms[];
	filledForms: FilledForm[];
	contacts: SalesForceUser;
	tickets: IssuesFromJira;
}

export const Dashboard = ({
	userForms,
	filledForms,
	contacts,
	tickets,
}: DashboardProps) => {
	const [tab, setTab] = useState("my-forms");

	const changeTab = (tab: string) => setTab(tab);

	return (
		<>
			<div className="w-full flex flex-col lg:flex-row lg:max-w-[1280px] lg:mx-auto px-5">
				<DashboardTabs selectedKey={tab} changeTab={(tab) => changeTab(tab)} />
			</div>
			{tab === "my-forms" ? (
				<>
					{" "}
					<MyFormsTable forms={userForms} />{" "}
				</>
			) : tab === "join-us" ? (
				<>
					<JoinUsTab data={contacts} />
				</>
			) : tab === "my-answers" ? (
				<>
					<MyFilledForm filledForms={filledForms} />
				</>
			) : (
				<>
					<Issues tickets={tickets} />
				</>
			)}
		</>
	);
};

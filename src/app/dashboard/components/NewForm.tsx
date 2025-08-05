"use client";

import { useState } from "react";
import { CreateFormTabs, GeneralSettings, SetQuestions } from ".";

export const NewForm = () => {
	const [selectedTab, setSelectedTab] = useState("general-settings");
	const [formId, setFormId] = useState("");

	const onTabChange = (tab: string) => setSelectedTab(tab);

	return (
		<>
			<div className="flex w-full flex-row px-5 sm:mx-auto lg:max-w-[1280px]">
				<CreateFormTabs selectedKey={selectedTab} />
			</div>

			{selectedTab === "general-settings" ? (
				<GeneralSettings changeTab={onTabChange} setFormId={setFormId} />
			) : (
				<SetQuestions formId={formId} />
			)}
		</>
	);
};

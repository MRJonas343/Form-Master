"use client";

import { useState } from "react";
import { CreateFormTabs, GeneralSettings, SetQuestions } from ".";

export const NewForm = () => {
	const [selectedTab, setSelectedTab] = useState("general-settings");
	const [formId, setFormId] = useState("");

	const onTabChange = (tab: string) => setSelectedTab(tab);

	return (
		<>
			<div className="w-full flex flex-row lg:max-w-[1280px] sm:mx-auto px-5">
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

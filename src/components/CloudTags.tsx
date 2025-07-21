"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { tabs } from "@/constants";

export const CloudTags = () => {
	const t = useTranslations("CloudTags");

	const pathname = usePathname();

	const tab = pathname.split("/")[1];

	return (
		<div className="w-[95%] mx-auto justify-start max-w-[1250px] lg:mx-auto flex mt-2 lg:mt-2 overflow-x-auto scrollBarCloudTags">
			<Tabs
				selectedKey={tab ?? null}
				className={`max-w-[1250px] ${tab === "noKey" && "hidden"}`}
				color="primary"
				variant="light"
				aria-label="Dynamic tabs"
			>
				{tabs.map((item) => (
					<Tab
						key={item.value}
						className={item.value === "noKey" ? "hidden" : ""}
						href={`/${item.value}`}
						title={
							<div className="flex items-center space-x-2">
								{item.icon}
								<span>{t(item.value)}</span>
							</div>
						}
					/>
				))}
			</Tabs>
		</div>
	);
};

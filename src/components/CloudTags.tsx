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
		<div className="scrollBarCloudTags mx-auto mt-2 flex w-[95%] max-w-[1250px] justify-start overflow-x-auto lg:mx-auto lg:mt-2">
			<Tabs
				aria-label="Dynamic tabs"
				className={`max-w-[1250px] ${tab === "noKey" && "hidden"}`}
				color="primary"
				selectedKey={tab ?? null}
				variant="light"
			>
				{tabs.map((item) => (
					<Tab
						className={item.value === "noKey" ? "hidden" : ""}
						href={`/${item.value}`}
						key={item.value}
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

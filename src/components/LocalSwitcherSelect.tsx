"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useTransition } from "react";
import type { Locale } from "@/i18n";
import type { LocalSwitcherSelectProps } from "@/interfaces";
import { setUserLocale } from "@/services/lang/local";

export default function LocalSwitcherSelect({
	defaultValue,
	items,
	label,
}: LocalSwitcherSelectProps) {
	const [, startTransition] = useTransition();

	const handleLocaleChange = (locale: string) => {
		startTransition(() => {
			setUserLocale(locale as Locale);
		});
	};

	return (
		<Select
			radius="sm"
			variant="bordered"
			aria-label={label}
			defaultSelectedKeys={[defaultValue]}
			className="w-28"
			onChange={(e) => handleLocaleChange(e.target.value)}
		>
			<SelectItem key="en" value={items[0].value}>
				{items[0].label}
			</SelectItem>
			<SelectItem key="es" value={items[1].value}>
				{items[1].label}
			</SelectItem>
		</Select>
	);
}

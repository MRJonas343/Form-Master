"use client";

import { Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { FaSearch } from "react-icons/fa";
import type { SearchInputProps } from "@/interfaces";

export const SearchInput: FC<SearchInputProps> = ({
	placeholder,
	size,
	classname,
	value,
	setValue,
}) => {
	const t = useTranslations("SearchBar");

	return (
		<Input
			radius="sm"
			size={size ?? "sm"}
			isClearable
			startContent={<FaSearch />}
			placeholder={placeholder ?? t("search")}
			className={classname ?? "mx-5 lg:w-80"}
			variant="bordered"
			value={value}
			onValueChange={setValue}
		/>
	);
};

"use client";

import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";

export const ImageContainer = () => {
	const { theme } = useTheme();

	return (
		<Image
			alt="FormMaster Dashboard"
			className="h-auto w-full object-cover"
			src={theme === "dark" ? "/hero_dark.png" : "/hero_white.png"}
		/>
	);
};

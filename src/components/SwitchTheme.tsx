"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import type { SwitchThemeProps } from "@/interfaces";

export const SwitchTheme: FC<SwitchThemeProps> = ({ size = "md" }) => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	return (
		<Switch
			size={size}
			isSelected={theme === "dark"}
			onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
			thumbIcon={({ isSelected, className }) =>
				isSelected ? (
					<MdDarkMode className={className} />
				) : (
					<IoIosSunny className={className} />
				)
			}
		/>
	);
};

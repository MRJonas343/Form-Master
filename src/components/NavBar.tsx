"use client";

import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { SwitchTheme, LanguageSwitcher, FormMasterLogo } from "@/components";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { NavbarMenuToggle, Link, NavbarItem } from "@nextui-org/react";
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, type FC } from "react";
import { useRouter } from "next/navigation";

export const NavBar: FC = ({
	position,
}: { position?: "static" | "sticky" }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const t = useTranslations("NavBar");
	const { data: session } = useSession();

	const handleLogOut = async () => {
		await signOut();
		if (typeof window !== "undefined") window.location.href = "/";
	};

	return (
		<Navbar
			position={position ?? "static"}
			isBordered
			onMenuOpenChange={setIsMenuOpen}
			maxWidth="xl"
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<FormMasterLogo className="hidden md:block" />
					<Link href="/" className="font-bold text-inherit pl-3 cursor-pointer">
						Form Master
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem isActive={pathname === "/"}>
					<Link
						color={pathname === "/" ? "primary" : "foreground"}
						href="/"
						aria-current="page"
					>
						{t("latest")}
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathname === "/popular-forms"}>
					<Link
						color={pathname === "/popular-forms" ? "primary" : "foreground"}
						href="/popular-forms"
						aria-current="page"
					>
						{t("popular")}
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem
					className="hidden lg:flex font-semibold"
					isActive={pathname === "/login"}
				>
					{!session && (
						<Link
							href="/login"
							color={pathname === "/login" ? "primary" : "foreground"}
						>
							{t("login")}
						</Link>
					)}
					{session && `${t("welcome")} ${session.user?.name}`}
				</NavbarItem>
				<NavbarItem>
					<Button
						as={Link}
						color="primary"
						href={session ? "/dashboard" : "/register"}
						className={`font-semibold ${pathname === "/my-forms" && "hidden"}`}
						variant="shadow"
						radius="sm"
					>
						{session ? t("myForms") : t("join")}
					</Button>
				</NavbarItem>
				<Popover placement="bottom">
					<PopoverTrigger className="hidden sm:flex">
						<Button isIconOnly className="bg-transparent">
							<IoSettingsOutline size={30} />
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div
							className={`px-1 py-2 flex items-center ${!session ? "flex-row" : "flex-col"}`}
						>
							<SwitchTheme size="lg" />
							<div className="pb-2" />
							<LanguageSwitcher />
							<Button
								radius="sm"
								color="danger"
								variant="bordered"
								className={`text-mediun p-0 font-normal w-full mt-2 ${!session && "hidden"}`}
								onClick={() => handleLogOut()}
							>
								{t("logOut")}
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</NavbarContent>
			<NavbarMenu>
				<NavbarMenuItem
					isActive={pathname === "/login"}
					hidden={Boolean(session)}
				>
					<Link
						href="/login"
						color={pathname === "/login" ? "primary" : "foreground"}
					>
						{t("login")}
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem isActive={pathname === "/"}>
					<Link href="/" color={pathname === "/" ? "primary" : "foreground"}>
						{t("latest")}
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem isActive={pathname === "/popular-forms"}>
					<Link
						href="/popular-forms"
						color={pathname === "/popular-forms" ? "primary" : "foreground"}
					>
						{t("popular")}
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem hidden={!session}>
					<Button
						className="pb-2 mx-0 bg-transparent pl-0 text-red-700 font-normal text-medium "
						onClick={() => handleLogOut()}
					>
						{t("logOut")}
					</Button>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<LanguageSwitcher />
				</NavbarMenuItem>
				<SwitchTheme size="lg" />
			</NavbarMenu>
		</Navbar>
	);
};

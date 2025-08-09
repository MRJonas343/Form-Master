"use client";

import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { type FC, useState } from "react";
import { FaBug } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FormMasterLogo, LanguageSwitcher, SwitchTheme } from "@/components";
import { IssueModal } from "./IssueModal";

export const NavBar: FC = ({
	position,
}: {
	position?: "static" | "sticky";
}) => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const t = useTranslations("NavBar");
	const { data: session } = useSession();

	const handleLogOut = async () => {
		await signOut();
		if (typeof window !== "undefined") window.location.href = "/";
	};

	return (
		<>
			<Navbar
				isBordered
				maxWidth="xl"
				onMenuOpenChange={setIsMenuOpen}
				position={position ?? "sticky"}
			>
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="sm:hidden"
					/>
					<NavbarBrand>
						<FormMasterLogo className="hidden md:block" />
						<Link
							className="cursor-pointer pl-3 font-bold text-inherit"
							href={session ? "/latest-forms" : "/"}
						>
							Form Master
						</Link>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent className="hidden gap-4 sm:flex" justify="center">
					<NavbarItem isActive={pathname === "/latest-forms"}>
						<Link
							aria-current="page"
							color={pathname === "/latest-forms" ? "primary" : "foreground"}
							href="/latest-forms"
						>
							{t("latest")}
						</Link>
					</NavbarItem>
					<NavbarItem isActive={pathname === "/popular-forms"}>
						<Link
							aria-current="page"
							color={pathname === "/popular-forms" ? "primary" : "foreground"}
							href="/popular-forms"
						>
							{t("popular")}
						</Link>
					</NavbarItem>
				</NavbarContent>

				<NavbarContent justify="end">
					<NavbarItem
						className="hidden font-semibold lg:flex"
						isActive={pathname === "/login"}
					>
						{!session && (
							<Link
								color={pathname === "/login" ? "primary" : "foreground"}
								href="/login"
							>
								{t("login")}
							</Link>
						)}
						{session && `${t("welcome")} ${session.user?.name}`}
					</NavbarItem>
					<NavbarItem>
						<Button
							as={Link}
							className={`font-semibold ${pathname === "/my-forms" && "hidden"}`}
							color="primary"
							href={session ? "/dashboard" : "/register"}
							radius="sm"
							variant="shadow"
						>
							{session ? t("myForms") : t("join")}
						</Button>
					</NavbarItem>
					<Popover placement="bottom">
						<PopoverTrigger className="hidden sm:flex">
							<Button className="bg-transparent" isIconOnly>
								<IoSettingsOutline size={30} />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<div
								className={`flex items-center px-1 py-2 ${session ? "flex-col" : "flex-row"}`}
							>
								<SwitchTheme size="lg" />

								<div className="pb-2" />
								<LanguageSwitcher />
								<Button
									className={`mt-2 w-full ${!session && "hidden"}`}
									endContent={<FaBug size={14} />}
									hidden={!session}
									onClick={onOpen}
									radius="sm"
									size="md"
									variant="bordered"
								>
									Issue
								</Button>
								<Button
									as={Link}
									className={`mt-2 w-full ${session?.user.role !== "admin" && "hidden"}`}
									hidden={session?.user.role !== "admin"}
									href="/admin/panel"
									radius="sm"
									size="md"
									variant="bordered"
								>
									Admin
								</Button>
								<Button
									className={`mt-2 w-full p-0 font-normal text-mediun text-red-700 ${!session && "hidden"}`}
									onClick={() => handleLogOut()}
									radius="sm"
									variant="bordered"
								>
									{t("logOut")}
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</NavbarContent>
				<NavbarMenu>
					<NavbarMenuItem
						hidden={Boolean(session)}
						isActive={pathname === "/login"}
					>
						<Link
							color={pathname === "/login" ? "primary" : "foreground"}
							href="/login"
						>
							{t("login")}
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem isActive={pathname === "/latest-forms"}>
						<Link
							color={pathname === "/latest-forms" ? "primary" : "foreground"}
							href="/latest-forms"
						>
							{t("latest")}
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem isActive={pathname === "/popular-forms"}>
						<Link
							color={pathname === "/popular-forms" ? "primary" : "foreground"}
							href="/popular-forms"
						>
							{t("popular")}
						</Link>
					</NavbarMenuItem>
					<NavbarMenuItem
						hidden={session?.user.role !== "admin"}
						isActive={pathname === "/admin/panel"}
					>
						<Link
							color={pathname === "/admin/panel" ? "primary" : "foreground"}
							href="/admin/panel"
						>
							Admin
						</Link>
					</NavbarMenuItem>

					<NavbarMenuItem hidden={!session}>
						<Button
							className="mx-0 bg-transparent pb-2 pl-0 font-normal text-medium text-red-700"
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
			<IssueModal
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	);
};

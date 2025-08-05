"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord, FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import type { User } from "@/interfaces/UserCredentials";
import { createUser } from "@/services/auth/createUser";
import { handleStatus } from "@/utils";

export const RegisterForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const t = useTranslations("auth");

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<User>();

	const onSubmit = async (data: User) => {
		setIsSubmitting(true);
		const status = await createUser(data.name, data.email, data.password ?? "");
		handleStatus(status, t, "/latest-forms");
		setIsSubmitting(false);
		reset();
	};

	return (
		<section className="flex flex-col max-w-[600px] w-[95%] ga">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					radius="sm"
					size="lg"
					variant="bordered"
					isInvalid={Boolean(errors.name)}
					errorMessage={t("invalidName")}
					autoFocus
					className="mb-4"
					placeholder={t("name")}
					{...register("name", {
						required: true,
						minLength: 1,
						maxLength: 50,
					})}
				/>
				<Input
					radius="sm"
					size="lg"
					className="mb-4"
					variant="bordered"
					isInvalid={Boolean(errors.email)}
					errorMessage={t("invalidEmail")}
					placeholder={t("email")}
					{...register("email", {
						required: true,
						maxLength: 40,
						pattern: /^\S+@\S+$/i,
					})}
				/>
				<Input
					radius="sm"
					size="lg"
					className="mb-4"
					variant="bordered"
					isInvalid={Boolean(errors.password)}
					errorMessage={t("invalidPassword")}
					type={isPasswordVisible ? "text" : "password"}
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							onClick={togglePasswordVisibility}
							aria-label="toggle password visibility"
						>
							{isPasswordVisible ? (
								<FaEye className="text-2xl text-default-400 pointer-events-none" />
							) : (
								<FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
							)}
						</button>
					}
					placeholder={t("password")}
					{...register("password", {
						required: true,
						minLength: 8,
						maxLength: 40,
					})}
				/>
				<Button
					color="primary"
					variant="shadow"
					size="lg"
					radius="sm"
					isLoading={isSubmitting}
					type="submit"
					className="text-xl font-semibold mb-4 w-full"
				>
					{t("register")}
				</Button>
			</form>
			<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-700 after:mt-0.5 after:flex-1 after:border-t after:border-gray-700">
				<p className="mx-4 mb-0 text-center"> {t("orLoginWith")} </p>
			</div>
			<Button
				variant="shadow"
				color="primary"
				size="lg"
				radius="sm"
				type="submit"
				className="text-xl font-semibold bg-[#5865F2] mb-4"
				onClick={() =>
					signIn("discord", {
						redirect: true,
						redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
					})
				}
			>
				<FaDiscord size={22} color="white" />
				<p className="text-white">Discord</p>
			</Button>
			<Button
				variant="shadow"
				size="lg"
				radius="sm"
				type="submit"
				className="text-xl font-semibold bg-black"
				onClick={() =>
					signIn("github", {
						redirect: true,
						redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
					})
				}
			>
				<FaGithub size={20} color="white" />
				<p className="text-white">{t("loginWithGithub")}</p>
			</Button>
			<p className="text-center mt-4 mb-2">{t("haveAccount")}</p>
			<Link
				color="primary"
				size="lg"
				className="text-xl font-semibold flex justify-center cursor-pointer"
				href="/login"
			>
				{t("loginHere")}
			</Link>
		</section>
	);
};

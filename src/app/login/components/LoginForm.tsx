"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import type { UserCredentials } from "@/interfaces";
import { authorize } from "@/services/auth/authorize";
import { handleStatus } from "@/utils";

export const LoginForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const t = useTranslations("auth");

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<UserCredentials>();

	const onSubmit = async (data: UserCredentials) => {
		setIsSubmitting(true);
		const status = await authorize(data.email, data.password);
		handleStatus(status, t, "/latest-forms");
		setIsSubmitting(false);
		reset();
	};

	return (
		<section className="flex flex-col gap-4  max-w-[600px] w-[95%]">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					radius="sm"
					size="lg"
					variant="bordered"
					isInvalid={Boolean(errors.email)}
					errorMessage={t("invalidEmail")}
					autoFocus
					placeholder="Email"
					{...register("email", {
						required: true,
						pattern: /^\S+@\S+$/i,
					})}
				/>
				<Input
					radius="sm"
					size="lg"
					variant="bordered"
					className="mt-4"
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
					})}
				/>
				<Button
					color="primary"
					variant="shadow"
					size="lg"
					radius="sm"
					isLoading={isSubmitting}
					type="submit"
					className="text-xl font-semibold w-full mt-4"
				>
					{t("login")}
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
				className="text-xl font-semibold bg-[#5865F2]"
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

			<p className="text-center pt-2">{t("notAccount")}</p>
			<Link
				color="primary"
				size="lg"
				className="text-xl font-semibold flex justify-center cursor-pointer"
				href="/register"
			>
				{t("getAccount")}
			</Link>
		</section>
	);
};

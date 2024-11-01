"use client";

import type { SalesForceAccount } from "@/interfaces/SalesForceAccount";
import type { SalesForceUser } from "@/interfaces/SalesForceAccount";
import { Input, Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createAccount } from "@/services";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";

export const JoinUsTab = ({ data }: { data: SalesForceUser }) => {
	const isFormDisabled = Boolean(data.AccountId);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<SalesForceAccount>();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const { data: session } = useSession();

	const onSubmit = async (data: SalesForceAccount) => {
		setIsSubmitting(true);
		const status = await createAccount(session?.user?.id ?? "", data);
		if (status === "SUCCESS") toast.success(t("welcome"));
		if (status === "ERROR") toast.error(t("error"));
		router.push("/dashboard");
		setIsSubmitting(false);
		reset();
	};

	const t = useTranslations("joinUs");

	return (
		<section className="flex flex-col max-w-[600px] w-[95%] mx-auto md:mt-7">
			{isFormDisabled ? (
				<p className="text-center font-bold text-xl sm:text-2xl md:text-3xl mt-2 mb-2">
					{t("AlreadyRegistered")}
				</p>
			) : (
				<>
					<h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl mt-2 mb-2">
						{t("title")}
					</h1>
					<p className="text-center mb-4">{t("offer")}</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							isDisabled={isFormDisabled}
							radius="sm"
							size="lg"
							variant="bordered"
							isInvalid={Boolean(errors.phone)}
							errorMessage={t("invalidPhone")}
							className="mb-4"
							placeholder={t("phone")}
							{...register("phone", {
								required: true,
								minLength: 1,
								maxLength: 10,
								pattern: /^\d{10}$/,
							})}
						/>
						<Input
							isDisabled={isFormDisabled}
							radius="sm"
							size="lg"
							variant="bordered"
							isInvalid={Boolean(errors.country)}
							errorMessage={t("invalidCountry")}
							className="mb-4"
							placeholder={t("country")}
							{...register("country", {
								required: true,
								minLength: 1,
								maxLength: 50,
							})}
						/>
						<Button
							isDisabled={isFormDisabled}
							color="primary"
							variant="shadow"
							size="lg"
							radius="sm"
							isLoading={isSubmitting}
							type="submit"
							className="text-xl font-semibold mb-4 w-full"
						>
							{t("join")}
						</Button>
					</form>
				</>
			)}
		</section>
	);
};

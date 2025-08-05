"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type {
	SalesForceAccount,
	SalesForceUser,
} from "@/interfaces/SalesForceAccount";
import { createAccount } from "@/services/salesforce/createAccount";

export const JoinUsTab = ({ data }: { data: SalesForceUser | null }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: session } = useSession();
	const t = useTranslations("joinUs");
	const router = useRouter();
	let isFormDisabled = false;

	if (data) isFormDisabled = true;

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<SalesForceAccount>();

	const onSubmit = async (data: SalesForceAccount) => {
		setIsSubmitting(true);
		const status = await createAccount(session?.user?.id ?? "", data);
		if (status === "SUCCESS") toast.success(t("welcome"));
		if (status === "ERROR") toast.error(t("error"));
		router.push("/dashboard");
		setIsSubmitting(false);
		reset();
	};

	return (
		<section className="mx-auto flex w-[95%] max-w-[600px] flex-col md:mt-7">
			{isFormDisabled ? (
				<p className="mt-2 mb-2 text-center font-bold text-xl sm:text-2xl md:text-3xl">
					{t("AlreadyRegistered")}
				</p>
			) : (
				<>
					<h1 className="mt-2 mb-2 text-center font-bold text-xl sm:text-2xl md:text-3xl">
						{t("title")}
					</h1>
					<p className="mb-4 text-center">{t("offer")}</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							className="mb-4"
							errorMessage={t("invalidPhone")}
							isDisabled={isFormDisabled}
							isInvalid={Boolean(errors.phone)}
							placeholder={t("phone")}
							radius="sm"
							size="lg"
							variant="bordered"
							{...register("phone", {
								required: true,
								minLength: 1,
								maxLength: 10,
								pattern: /^\d{10}$/,
							})}
						/>
						<Input
							className="mb-4"
							errorMessage={t("invalidCountry")}
							isDisabled={isFormDisabled}
							isInvalid={Boolean(errors.country)}
							placeholder={t("country")}
							radius="sm"
							size="lg"
							variant="bordered"
							{...register("country", {
								required: true,
								minLength: 1,
								maxLength: 50,
							})}
						/>
						<Button
							className="mb-4 w-full font-semibold text-xl"
							color="primary"
							isDisabled={isFormDisabled}
							isLoading={isSubmitting}
							radius="sm"
							size="lg"
							type="submit"
							variant="shadow"
						>
							{t("join")}
						</Button>
					</form>
				</>
			)}
		</section>
	);
};

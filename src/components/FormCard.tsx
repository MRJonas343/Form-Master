"use client";

import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Image,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { FcLike } from "react-icons/fc";
import { IoSettingsSharp } from "react-icons/io5";
import type { FormCardPropsWithModal } from "@/interfaces";

export const FormCard: FC<FormCardPropsWithModal> = ({
	id,
	title,
	authorName,
	likes,
	imageUrl,
	openModal,
}) => {
	const { data: session } = useSession();

	const t = useTranslations("formCard");

	const router = useRouter();

	const redirectToForm = () => {
		router.push(`/form/${id}`);
	};

	return (
		<Card className="w-full bg-transparent dark:bg-transparent sm:bg-default-50 pb-3 shadow-none sm:shadow-neutral-700/40 sm:shadow-sm rounded-none sm:rounded-2xl sm:max-w-[250px] sm:min-h-[320px] sm:mb-8 sm:dark:shadow-md sm:dark:border-[#5A5A89] sm:dark:border-1 sm:dark:border-opacity-30 sm:dark:shadow-[#5A5A89]">
			<CardHeader className="flex justify-center">
				<div
					className={`${session?.user?.role !== "admin" && "hidden"} z-20 absolute top-4 right-4`}
				>
					<Popover placement="bottom" showArrow={true}>
						<PopoverTrigger>
							<Button isIconOnly color="warning" size="sm">
								<IoSettingsSharp size={24} />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<div className="px-1 py-2 flex flex-col cursor-pointer gap-1">
								<Link
									className="text-foreground"
									href={`/dashboard/edit-form/${id}`}
								>
									{t("editForm")}
								</Link>
								<Link className="text-foreground" onPress={() => openModal(id)}>
									{t("seeAnswers")}
								</Link>
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<Image
					isZoomed
					className="w-[345px] sm:w-[270px] md:h-[150px]"
					src={imageUrl}
					alt="Cloud Tags"
					width={270}
					height={150}
				/>
			</CardHeader>
			<CardBody className="max-w-[320px] mx-auto sm:mx-0 sm:max-w-none px-6">
				<h3 className="pb-3 min-h-14">{title}</h3>
				<span className="text-sm pb-2 opacity-60">
					{t("by")} {authorName}
				</span>
				<div className="flex items-center w-full justify-between">
					<div className="flex items-center gap-3">
						<FcLike size={25} />
						<span>{likes}</span>
					</div>
					<Button
						radius="sm"
						variant="flat"
						color="primary"
						onClick={redirectToForm}
					>
						{t("answer")}
					</Button>
				</div>
			</CardBody>
		</Card>
	);
};

import { Image } from "@nextui-org/react";
import type { FC } from "react";
import type { FormMasterLogoProps } from "@/interfaces";

export const FormMasterLogo: FC<FormMasterLogoProps> = ({ className }) => {
	return (
		<div>
			<Image
				className={className}
				src="/images/logo.png"
				width={30}
				height={30}
				radius="none"
				alt="FormMaster Logo"
			/>
		</div>
	);
};

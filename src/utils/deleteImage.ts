import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { R2 } from "@/config";

export const deleteImage = async (imageKey: string) => {
	const params = {
		Bucket: process.env.R2_BUCKET_NAME || "",
		Key: imageKey,
	};

	try {
		await R2.send(new DeleteObjectCommand(params));
	} catch (error) {
		console.log(error);
		return "ERROR";
	}

	return "SUCCESS";
};

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { R2 } from "@/config";
import "dotenv/config";

export const uploadImage = async (file: File) => {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const uniqueKey = uuidv4();

	const uploadParams = {
		Bucket: process.env.R2_BUCKET_NAME || "",
		Key: `${uniqueKey}.png`,
		ContentType: file.type,
		Body: buffer,
	};

	const result = await R2.send(new PutObjectCommand(uploadParams));

	return `${process.env.IMAGE_BASE_URL}${uploadParams.Key}`;
};

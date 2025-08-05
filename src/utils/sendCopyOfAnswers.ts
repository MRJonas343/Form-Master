import { Resend } from "resend";
import { EmailTemplate } from "@/components";
import type { NewFilledForm } from "@/interfaces";
import "dotenv/config";

export const sendCopyOfAnswers = async (formData: NewFilledForm) => {
	const resend = new Resend(process.env.RESEND_KEY);

	await resend.emails.send({
		from: "noreply@formmaster.site",
		to: [formData.userEmail ?? ""],
		subject: "Hello World",
		react: EmailTemplate(formData),
	});
};

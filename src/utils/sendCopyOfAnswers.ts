import type { NewFilledForm } from "@/interfaces";
import { EmailTemplate } from "@/components";
import { Resend } from "resend";
import "dotenv/config";

export const sendCopyOfAnswers = async (formData: NewFilledForm) => {
	const resend = new Resend(process.env.RESEND_KEY);

	const { data } = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: [formData.userEmail ?? ""],
		subject: "Hello World",
		react: EmailTemplate(formData),
	});
};

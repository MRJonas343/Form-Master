// utils/sendCopyOfAnswers.ts

import { render } from "@react-email/render";
import { createElement } from "react";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";
import type { NewFilledForm } from "@/interfaces";
import "dotenv/config";

export const sendCopyOfAnswers = async (formData: NewFilledForm) => {
	try {
		const resend = new Resend(process.env.RESEND_KEY);

		const emailElement = createElement(EmailTemplate, formData);
		const html = await render(emailElement);

		const result = await resend.emails.send({
			from: "noreply@formmaster.site",
			to: formData.userEmail || "",
			subject: `Copia de tus respuestas - ${formData.formName}`,
			html,
		});

		return result;
	} catch (error) {
		throw new Error(
			`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`
		);
	}
};

// components/EmailTemplate.tsx
import {
	Body,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import type { FC } from "react";
import type { NewFilledForm } from "@/interfaces";

export const EmailTemplate: FC<Readonly<NewFilledForm>> = ({
	form,
	userName,
	formName,
}) => (
	<Html>
		<Head />
		<Preview>Resumen de tus respuestas al formulario {formName ?? ""}</Preview>
		<Body
			style={{
				fontFamily: "Arial, sans-serif",
				backgroundColor: "#f4f4f4",
				padding: "20px",
			}}
		>
			<Container
				style={{
					backgroundColor: "#ffffff",
					padding: "20px",
					borderRadius: "8px",
				}}
			>
				<Text style={{ fontSize: "20px", fontWeight: "bold" }}>
					Hola {userName || "Usuario"},
				</Text>
				<Text>
					Gracias por completar el formulario <strong>{formName}</strong>. Aquí
					está una copia de tus respuestas:
				</Text>
				<Section>
					<ul>
						{form.map((question) => (
							<li key={question.id}>
								<Text>
									<strong>{question.question}:</strong>{" "}
									{question.type === "single" &&
										question.value === true &&
										"Sí"}
									{question.type === "single" &&
										question.value === false &&
										"No"}
									{question.value !== true &&
										question.value !== false &&
										String(question.value)}
								</Text>
							</li>
						))}
					</ul>
				</Section>
				<Text style={{ fontSize: "14px", color: "#555" }}>
					Este correo fue generado automáticamente. No es necesario responder.
				</Text>
			</Container>
		</Body>
	</Html>
);

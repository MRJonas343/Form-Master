import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
	title: "Terms of Service - FormMaster",
	description: "FormMaster's terms of service and user agreement",
};

export default async function TermsOfServicePage() {
	const t = await getTranslations("legal.termsOfService");

	return (
		<div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-4xl text-foreground">
						{t("title")}
					</h1>
					<p className="text-muted-foreground">{t("lastUpdated")}</p>
				</div>

				<div className="prose prose-gray dark:prose-invert max-w-none">
					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.acceptance.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.acceptance.content")}
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.description.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.description.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.description.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.userAccounts.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.userAccounts.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.userAccounts.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.acceptableUse.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.acceptableUse.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.acceptableUse.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.contentOwnership.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.contentOwnership.content")}
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.serviceAvailability.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.serviceAvailability.content")}
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.limitationOfLiability.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.limitationOfLiability.content")}
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.termination.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.termination.content")}
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.changes.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.changes.content")}
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.contact.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.contact.content")}{" "}
							<a
								className="text-primary hover:underline"
								href={`mailto:${t("sections.contact.email")}`}
							>
								{t("sections.contact.email")}
							</a>
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}

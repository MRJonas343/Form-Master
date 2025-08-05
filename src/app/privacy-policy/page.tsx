import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
	title: "Privacy Policy - FormMaster",
	description: "FormMaster's privacy policy and data protection practices",
};

export default async function PrivacyPolicyPage() {
	const t = await getTranslations("legal.privacyPolicy");
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
							{t("sections.informationWeCollect.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.informationWeCollect.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t
								.raw("sections.informationWeCollect.list")
								.map((item: string) => (
									<li key={item}>• {item}</li>
								))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.howWeUseInformation.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.howWeUseInformation.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t
								.raw("sections.howWeUseInformation.list")
								.map((item: string) => (
									<li key={item}>• {item}</li>
								))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.informationSharing.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.informationSharing.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.informationSharing.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.dataSecurity.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.dataSecurity.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.dataSecurity.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.yourRights.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.yourRights.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.yourRights.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.dataRetention.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.dataRetention.content")}
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

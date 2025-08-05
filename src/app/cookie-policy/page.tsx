import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
	title: "Cookie Policy - FormMaster",
	description: "FormMaster's cookie policy and usage information",
};

export default async function CookiePolicyPage() {
	const t = await getTranslations("legal.cookiePolicy");
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
							{t("sections.whatAreCookies.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.whatAreCookies.content")}
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.howWeUseCookies.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.howWeUseCookies.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.howWeUseCookies.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.typesOfCookies.title")}
						</h2>

						<div className="mb-6">
							<h3 className="mb-2 font-semibold text-foreground text-xl">
								{t("sections.typesOfCookies.essential.title")}
							</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								{t("sections.typesOfCookies.essential.content")}
							</p>
							<ul className="mb-4 space-y-2 text-muted-foreground">
								{t
									.raw("sections.typesOfCookies.essential.list")
									.map((item: string) => (
										<li key={item}>• {item}</li>
									))}
							</ul>
						</div>

						<div className="mb-6">
							<h3 className="mb-2 font-semibold text-foreground text-xl">
								{t("sections.typesOfCookies.functional.title")}
							</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								{t("sections.typesOfCookies.functional.content")}
							</p>
							<ul className="mb-4 space-y-2 text-muted-foreground">
								{t
									.raw("sections.typesOfCookies.functional.list")
									.map((item: string) => (
										<li key={item}>• {item}</li>
									))}
							</ul>
						</div>

						<div className="mb-6">
							<h3 className="mb-2 font-semibold text-foreground text-xl">
								{t("sections.typesOfCookies.analytics.title")}
							</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								{t("sections.typesOfCookies.analytics.content")}
							</p>
							<ul className="mb-4 space-y-2 text-muted-foreground">
								{t
									.raw("sections.typesOfCookies.analytics.list")
									.map((item: string) => (
										<li key={item}>• {item}</li>
									))}
							</ul>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.thirdPartyCookies.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.thirdPartyCookies.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.thirdPartyCookies.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.managingCookies.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.managingCookies.content")}
						</p>

						<div className="mb-6">
							<h3 className="mb-2 font-semibold text-foreground text-xl">
								{t("sections.managingCookies.browserSettings.title")}
							</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								{t("sections.managingCookies.browserSettings.content")}
							</p>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.cookieRetention.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.cookieRetention.content")}
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							{t.raw("sections.cookieRetention.list").map((item: string) => (
								<li key={item}>• {item}</li>
							))}
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							{t("sections.updates.title")}
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("sections.updates.content")}
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

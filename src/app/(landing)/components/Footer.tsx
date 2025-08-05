import { Github, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const Footer = async () => {
	const t = await getTranslations("landingPage.footer");

	return (
		<footer className="border-border border-t bg-muted/30">
			<div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					{/* Main Footer Content */}
					<div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
						{/* Brand */}
						<div className="space-y-4">
							<div className="flex items-center space-x-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-glow">
									<span className="font-bold text-lg text-white">F</span>
								</div>
								<span className="font-bold text-foreground text-xl">
									{t("brand.name")}
								</span>
							</div>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{t("brand.description")}
							</p>
							<div className="flex space-x-4">
								<a
									className="text-muted-foreground transition-colors hover:text-primary"
									href="https://github.com/MRJonas343/Form-Master"
								>
									<Github className="h-5 w-5" />
								</a>

								<a
									className="text-muted-foreground transition-colors hover:text-primary"
									href="mailto:angeljonasrosales@gmail.com"
								>
									<Mail className="h-5 w-5" />
								</a>
							</div>
						</div>

						{/* Product */}
						<div>
							<h3 className="mb-4 font-semibold text-foreground">
								{t("product.title")}
							</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<a
										className="text-muted-foreground transition-colors hover:text-foreground"
										href="#features"
									>
										{t("product.features")}
									</a>
								</li>
								<li>
									<a
										className="text-muted-foreground transition-colors hover:text-foreground"
										href="#how-it-works"
									>
										{t("product.howItWorks")}
									</a>
								</li>
							</ul>
						</div>

						{/* Company */}
						<div>
							<h3 className="mb-4 font-semibold text-foreground">
								{t("company.title")}
							</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<p className="text-muted-foreground transition-colors hover:text-foreground">
										{t("company.description")}
									</p>
								</li>
							</ul>
						</div>
					</div>

					{/* Tech Stack */}
					<div className="mb-8 border-border border-t pt-8">
						<h3 className="mb-4 text-center font-semibold text-foreground">
							{t("techStack.title")}
						</h3>
						<div className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm">
							<span className="rounded-full bg-muted px-3 py-1">Next.js</span>
							<span className="rounded-full bg-muted px-3 py-1">
								Tailwind CSS
							</span>
							<span className="rounded-full bg-muted px-3 py-1">MySQL</span>
							<span className="rounded-full bg-muted px-3 py-1">
								Drizzle ORM
							</span>
							<span className="rounded-full bg-muted px-3 py-1">
								Cloudflare R2
							</span>
							<span className="rounded-full bg-muted px-3 py-1">AWS</span>
							<span className="rounded-full bg-muted px-3 py-1">Tremor</span>
							<span className="rounded-full bg-muted px-3 py-1">Resend</span>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="flex flex-col items-center justify-between border-border border-t pt-8 text-muted-foreground text-sm md:flex-row">
						<div className="mb-4 md:mb-0">{t("copyright")}</div>
						<div className="flex space-x-6">
							<a
								className="transition-colors hover:text-foreground"
								href="/privacy-policy"
							>
								{t("legal.privacy")}
							</a>
							<a
								className="transition-colors hover:text-foreground"
								href="/terms-of-service"
							>
								{t("legal.terms")}
							</a>
							<a
								className="transition-colors hover:text-foreground"
								href="/cookie-policy"
							>
								{t("legal.cookies")}
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

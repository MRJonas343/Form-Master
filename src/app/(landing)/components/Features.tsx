import { Button, Link } from "@nextui-org/react";
import {
	BarChart3,
	Globe,
	Layout,
	Lock,
	Mail,
	MousePointer2,
	Search,
	Shield,
	Smartphone,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card } from "./Cards";

export const Features = async () => {
	const t = await getTranslations("landingPage.features");

	const features = [
		{
			icon: Layout,
			title: t("items.templates.title"),
			description: t("items.templates.description"),
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
		{
			icon: BarChart3,
			title: t("items.analytics.title"),
			description: t("items.analytics.description"),
			color: "text-green-600",
			bgColor: "bg-green-50",
		},
		{
			icon: Shield,
			title: t("items.accessControl.title"),
			description: t("items.accessControl.description"),
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
		{
			icon: Search,
			title: t("items.search.title"),
			description: t("items.search.description"),
			color: "text-orange-600",
			bgColor: "bg-orange-50",
		},
		{
			icon: MousePointer2,
			title: t("items.dragDrop.title"),
			description: t("items.dragDrop.description"),
			color: "text-pink-600",
			bgColor: "bg-pink-50",
		},
		{
			icon: Globe,
			title: t("items.i18n.title"),
			description: t("items.i18n.description"),
			color: "text-indigo-600",
			bgColor: "bg-indigo-50",
		},
		{
			icon: Mail,
			title: t("items.email.title"),
			description: t("items.email.description"),
			color: "text-cyan-600",
			bgColor: "bg-cyan-50",
		},
		{
			icon: Users,
			title: t("items.social.title"),
			description: t("items.social.description"),
			color: "text-emerald-600",
			bgColor: "bg-emerald-50",
		},
		{
			icon: Smartphone,
			title: t("items.mobile.title"),
			description: t("items.mobile.description"),
			color: "text-red-600",
			bgColor: "bg-red-50",
		},
		{
			icon: Lock,
			title: t("items.auth.title"),
			description: t("items.auth.description"),
			color: "text-violet-600",
			bgColor: "bg-violet-50",
		},
		{
			icon: Zap,
			title: t("items.performance.title"),
			description: t("items.performance.description"),
			color: "text-yellow-600",
			bgColor: "bg-yellow-50",
		},
		{
			icon: Sparkles,
			title: t("items.enterprise.title"),
			description: t("items.enterprise.description"),
			color: "text-teal-600",
			bgColor: "bg-teal-50",
		},
	];

	return (
		<section className="bg-background py-12" id="features">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					{/* Section Header */}
					<div className="mb-16 animate-fade-in text-center">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm">
							<Sparkles className="h-4 w-4" />
							{t("badge")}
						</div>
						<h2 className="mb-6 font-bold text-3xl text-foreground sm:text-4xl lg:text-5xl">
							{t("title")}
							<span className="text-blue-600"> {t("titleHighlight")}</span>
						</h2>
						<p className="mx-auto max-w-3xl text-muted-foreground text-xl">
							{t("subtitle")}
						</p>
					</div>

					{/* Features Grid */}
					<div className="grid animate-fade-in-up grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{features.map((feature) => (
							<Card
								className="border-border/50 bg-feature-gradient p-6 transition-all duration-300 hover:scale-105 hover:shadow-large"
								key={feature.title}
							>
								<div
									className={`h-12 w-12 rounded-lg ${feature.bgColor} mb-4 flex items-center justify-center`}
								>
									<feature.icon className={`h-6 w-6 ${feature.color}`} />
								</div>
								<h3 className="mb-2 font-semibold text-foreground text-lg">
									{feature.title}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{feature.description}
								</p>
							</Card>
						))}
					</div>

					{/* Bottom CTA */}
					<div className="mt-16 animate-fade-in text-center">
						<p className="mb-6 text-muted-foreground">{t("cta.text")}</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button
								as={Link}
								color="primary"
								endContent={<Sparkles className="h-4 w-4" />}
								href="/register"
								variant="shadow"
							>
								{t("cta.button")}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

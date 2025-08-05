import { Button } from "@nextui-org/react";
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
import { Card } from "./Cards";

export const Features = () => {
	const features = [
		{
			icon: Layout,
			title: "Template-Based System",
			description:
				"Create reusable question templates with multiple input types - text, numbers, checkboxes, and multiple choice.",
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
		{
			icon: BarChart3,
			title: "Real-time Analytics",
			description:
				"Get instant insights with beautiful charts, aggregated results, and comprehensive data visualization.",
			color: "text-green-600",
			bgColor: "bg-green-50",
		},
		{
			icon: Shield,
			title: "Advanced Access Control",
			description:
				"Manage permissions with public forms, restricted access, and comprehensive admin controls.",
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
		{
			icon: Search,
			title: "Full-text Search",
			description:
				"Find any form instantly by content, tags, authors, or any text within your forms and responses.",
			color: "text-orange-600",
			bgColor: "bg-orange-50",
		},
		{
			icon: MousePointer2,
			title: "Drag & Drop Interface",
			description:
				"Reorder questions visually with an intuitive interface that makes form building effortless.",
			color: "text-pink-600",
			bgColor: "bg-pink-50",
		},
		{
			icon: Globe,
			title: "Internationalization",
			description:
				"Built-in support for English and Spanish with easy localization for global teams.",
			color: "text-indigo-600",
			bgColor: "bg-indigo-50",
		},
		{
			icon: Mail,
			title: "Email Notifications",
			description:
				"Automatic email copies of responses sent to users, keeping everyone in the loop.",
			color: "text-cyan-600",
			bgColor: "bg-cyan-50",
		},
		{
			icon: Users,
			title: "Social Features",
			description:
				"Comments, likes, and social interactions make forms more engaging and collaborative.",
			color: "text-emerald-600",
			bgColor: "bg-emerald-50",
		},
		{
			icon: Smartphone,
			title: "Mobile Responsive",
			description:
				"Perfect experience across all devices - desktop, tablet, and mobile optimized.",
			color: "text-red-600",
			bgColor: "bg-red-50",
		},
		{
			icon: Lock,
			title: "GitHub & Discord Auth",
			description:
				"Seamless social authentication - no complex signups, just connect and start building.",
			color: "text-violet-600",
			bgColor: "bg-violet-50",
		},
		{
			icon: Zap,
			title: "Lightning Fast",
			description:
				"Built with modern tech stack for blazing fast performance and instant loading.",
			color: "text-yellow-600",
			bgColor: "bg-yellow-50",
		},
		{
			icon: Sparkles,
			title: "Enterprise Ready",
			description:
				"Scalable architecture with MySQL, Cloudflare R2, and AWS infrastructure.",
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
							Powerful Features
						</div>
						<h2 className="mb-6 font-bold text-3xl text-foreground sm:text-4xl lg:text-5xl">
							Everything you need to build
							<span className="text-blue-600"> amazing forms</span>
						</h2>
						<p className="mx-auto max-w-3xl text-muted-foreground text-xl">
							From simple surveys to complex data collection, FormMaster
							provides enterprise-grade features in an intuitive package that
							teams love to use.
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
						<p className="mb-6 text-muted-foreground">
							Ready to experience the next generation of form builders?
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button
								color="primary"
								endContent={<Sparkles className="h-4 w-4" />}
								variant="shadow"
							>
								Start Building Forms
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

import {
	ArrowRight,
	BarChart3,
	FileText,
	MousePointer2,
	Users,
} from "lucide-react";
import { Card, MockFormBuilder } from ".";

export const HowItWorks = () => {
	const steps = [
		{
			step: "01",
			icon: FileText,
			title: "Create Your Template",
			description:
				"Start with our drag-and-drop builder. Add questions, customize styling, and set up validation rules. Save as a reusable template.",
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
		{
			step: "02",
			icon: Users,
			title: "Share & Collect",
			description:
				"Share your form via link or embed. Set access controls, enable social auth, and watch responses come in real-time.",
			color: "text-green-600",
			bgColor: "bg-green-50",
		},
		{
			step: "03",
			icon: BarChart3,
			title: "Analyze & Insights",
			description:
				"Get instant analytics with beautiful charts. Export data, track trends, and make data-driven decisions effortlessly.",
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
	];

	return (
		<section className="bg-muted/30 pt-12 pb-24" id="how-it-works">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					{/* Section Header */}
					<div className="mb-16 animate-fade-in text-center">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm">
							<MousePointer2 className="h-4 w-4" />
							How It Works
						</div>
						<h2 className="mb-6 font-bold text-3xl text-foreground sm:text-4xl lg:text-5xl">
							From idea to insights in
							<span className="text-blue-600"> 3 simple steps</span>
						</h2>
						<p className="mx-auto max-w-3xl text-muted-foreground text-xl">
							FormMaster makes it incredibly easy to go from concept to
							collecting valuable data. No technical skills required, just your
							creativity.
						</p>
					</div>

					{/* Steps */}
					<div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
						{steps.map((step, index) => (
							<div
								className="relative animate-fade-in-up"
								key={step.title}
								style={{ animationDelay: `${index * 0.2}s` }}
							>
								<Card className="border-border/50 bg-background p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-large">
									{/* Step Number */}
									<div className="mb-4 font-bold text-6xl text-blue-600">
										{step.step}
									</div>

									{/* Icon */}
									<div
										className={`h-16 w-16 rounded-full ${step.bgColor} mx-auto mb-6 flex items-center justify-center`}
									>
										<step.icon className={`h-8 w-8 ${step.color}`} />
									</div>

									{/* Content */}
									<h3 className="mb-4 font-semibold text-foreground text-xl">
										{step.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{step.description}
									</p>
								</Card>

								{/* Arrow between steps */}
								{index < steps.length - 1 && (
									<div className="-right-4 -translate-y-1/2 absolute top-1/2 z-10 hidden transform lg:block">
										<ArrowRight className="h-8 w-8 text-primary/40" />
									</div>
								)}
							</div>
						))}
					</div>

					{/* Interactive Demo */}
					<div className="animate-fade-in rounded-2xl border border-border bg-gradient-to-br from-background to-muted/30 p-8 shadow-large">
						<div className="mb-8 text-center">
							<h3 className="mb-4 font-bold text-2xl text-foreground">
								Try the Form Builder
							</h3>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Experience our intuitive drag-and-drop form builder. Add
								questions, customize types, and see how easy it is to create
								professional forms.
							</p>
						</div>

						{/* Interactive Mock Form Builder */}
						<MockFormBuilder />
					</div>
				</div>
			</div>
		</section>
	);
};

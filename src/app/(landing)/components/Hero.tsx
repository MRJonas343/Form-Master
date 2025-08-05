import { Button, Link } from "@nextui-org/react";
import { ArrowRight, Sparkles, UserPlus } from "lucide-react";
import { ImageContainer } from "./ImageContainer";

export const Hero = () => {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/5 pt-20 pb-16">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-5" />

			<div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						{/* Hero Content */}
						<div className="animate-fade-in-up text-center lg:text-left">
							{/* Badge */}
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm shadow-soft">
								<Sparkles className="h-4 w-4" />
								Google Forms with Superpowers 💪
							</div>

							{/* Main Headline */}
							<h1 className="mb-6 font-bold text-4xl text-foreground leading-tight sm:text-5xl lg:text-6xl">
								Create Powerful
								<span className="bg-blue-600 bg-clip-text text-transparent">
									{" "}
									Forms
								</span>
								<br />
								That Actually Work
							</h1>

							{/* Subheadline */}
							<p className="mx-auto mb-8 max-w-xl text-muted-foreground text-xl leading-relaxed lg:mx-0">
								Build reusable form templates, get real-time analytics, and
								manage responses with enterprise-grade features. The modern form
								builder for teams that ship.
							</p>

							{/* CTA Buttons */}
							<div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
								<Button
									as={Link}
									className="h-auto px-8 py-4 font-bold text-lg"
									color="primary"
									href="/login"
									size="lg"
									variant="shadow"
								>
									<UserPlus className="h-5 w-5" />
									Start building
									<ArrowRight className="h-5 w-5" />
								</Button>
							</div>

							{/* Social Proof */}
							<div className="flex items-center justify-center gap-6 text-muted-foreground text-sm lg:justify-start">
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 animate-pulse rounded-full bg-success" />
									No complex setup
								</div>
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 animate-pulse rounded-full bg-success" />
									Enterprise-ready
								</div>
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 animate-pulse rounded-full bg-success" />
									Multi-language
								</div>
							</div>
						</div>

						{/* Hero Image */}
						<div className="relative animate-scale-in">
							<div className="relative overflow-hidden rounded-2xl shadow-large">
								<ImageContainer />
								<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
							</div>

							{/* Floating Elements */}
							<div className="-top-4 -right-4 absolute z-10 animate-bounce rounded-full bg-success px-4 py-2 font-semibold text-sm text-success-foreground shadow-large">
								Powerful form builder
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

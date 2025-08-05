import { Github, Mail } from "lucide-react";

export const Footer = () => {
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
									FormMaster
								</span>
							</div>
							<p className="text-muted-foreground text-sm leading-relaxed">
								The modern form builder for teams that ship. Create powerful
								forms with enterprise-grade features.
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
							<h3 className="mb-4 font-semibold text-foreground">Product</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<a
										className="text-muted-foreground transition-colors hover:text-foreground"
										href="#features"
									>
										Features
									</a>
								</li>
								<li>
									<a
										className="text-muted-foreground transition-colors hover:text-foreground"
										href="#how-it-works"
									>
										How it works
									</a>
								</li>
							</ul>
						</div>

						{/* Company */}
						<div>
							<h3 className="mb-4 font-semibold text-foreground">Company</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<p className="text-muted-foreground transition-colors hover:text-foreground">
										Company? Im just a single developer 😭
									</p>
								</li>
							</ul>
						</div>
					</div>

					{/* Tech Stack */}
					<div className="mb-8 border-border border-t pt-8">
						<h3 className="mb-4 text-center font-semibold text-foreground">
							Built with Modern Technology
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
						<div className="mb-4 md:mb-0">
							© 2024 FormMaster. Developed by Jonas. All rights reserved.
						</div>
						<div className="flex space-x-6">
							<a
								className="transition-colors hover:text-foreground"
								href="/privacy-policy"
							>
								Privacy Policy
							</a>
							<a
								className="transition-colors hover:text-foreground"
								href="/terms-of-service"
							>
								Terms of Service
							</a>
							<a
								className="transition-colors hover:text-foreground"
								href="/cookie-policy"
							>
								Cookie Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cookie Policy - FormMaster",
	description: "FormMaster's cookie policy and usage information",
};

export default function CookiePolicyPage() {
	return (
		<div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-4xl text-foreground">
						Cookie Policy
					</h1>
					<p className="text-muted-foreground">Last updated: December 2024</p>
				</div>

				<div className="prose prose-gray dark:prose-invert max-w-none">
					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							1. What Are Cookies
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							Cookies are small text files that are stored on your computer or
							mobile device when you visit a website. They help websites
							remember information about your visit, which can make it easier to
							visit the site again and make the site more useful to you.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							2. How We Use Cookies
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							FormMaster uses cookies to enhance your experience and provide
							essential functionality:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Authentication and security</li>
							<li>• User preferences and settings</li>
							<li>• Performance monitoring and analytics</li>
							<li>• Feature functionality and user experience</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							3. Types of Cookies We Use
						</h2>

						<div className="mb-6">
							<h3 className="mb-2 font-semibold text-foreground text-xl">
								Essential Cookies
							</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								These cookies are necessary for the website to function and
								cannot be switched off in our systems. They are usually only set
								in response to actions made by you which amount to a request for
								services.
							</p>
							<ul className="mb-4 space-y-2 text-muted-foreground">
								<li>• Session authentication cookies</li>
								<li>• Security and fraud prevention</li>
								<li>• Load balancing cookies</li>
							</ul>
						</div>

						<div className="mb-6">
							<h3 className="mb-2 font-semibold text-foreground text-xl">
								Functional Cookies
							</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								These cookies enable the website to provide enhanced
								functionality and personalization based on your interactions.
							</p>
							<ul className="mb-4 space-y-2 text-muted-foreground">
								<li>• User preferences (theme, language)</li>
								<li>• Form data temporary storage</li>
								<li>• UI state and settings</li>
							</ul>
						</div>

						<div className="mb-6">
							<h3 className="mb-2 font-semibold text-foreground text-xl">
								Analytics Cookies
							</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								These cookies help us understand how visitors interact with our
								website by collecting and reporting information anonymously.
							</p>
							<ul className="mb-4 space-y-2 text-muted-foreground">
								<li>• Page view tracking</li>
								<li>• User behavior analytics</li>
								<li>• Performance monitoring</li>
							</ul>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							4. Third-Party Cookies
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We may use third-party services that set their own cookies to
							provide functionality or analytics:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• NextAuth.js for authentication</li>
							<li>• Cloudflare for security and performance</li>
							<li>• GitHub OAuth for social login</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							5. Managing Cookies
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							Most web browsers allow you to control cookies through their
							settings preferences. However, if you limit the ability of
							websites to set cookies, you may worsen your overall user
							experience.
						</p>

						<div className="mb-6">
							<h3 className="mb-2 font-semibold text-foreground text-xl">
								Browser Settings
							</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								You can control and/or delete cookies as you wish. You can
								delete all cookies that are already on your computer and you can
								set most browsers to prevent them from being placed.
							</p>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							6. Cookie Retention
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							Different types of cookies have different lifespans:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Session cookies: Deleted when you close your browser</li>
							<li>
								• Persistent cookies: Remain for a set period (usually 30 days
								to 1 year)
							</li>
							<li>• Authentication cookies: Last until you log out</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							7. Updates to This Policy
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We may update this Cookie Policy from time to time to reflect
							changes in our practices or for other operational, legal, or
							regulatory reasons. We will notify you of any material changes.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							8. Contact Us
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							If you have any questions about our use of cookies, please contact
							us at:{" "}
							<a
								className="text-primary hover:underline"
								href="mailto:angeljonasrosales@gmail.com"
							>
								angeljonasrosales@gmail.com
							</a>
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service - FormMaster",
	description: "FormMaster's terms of service and user agreement",
};

export default function TermsOfServicePage() {
	return (
		<div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-4xl text-foreground">
						Terms of Service
					</h1>
					<p className="text-muted-foreground">Last updated: December 2024</p>
				</div>

				<div className="prose prose-gray dark:prose-invert max-w-none">
					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							1. Acceptance of Terms
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							By accessing and using FormMaster, you accept and agree to be
							bound by the terms and provision of this agreement. If you do not
							agree to abide by the above, please do not use this service.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							2. Description of Service
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							FormMaster is a web-based form building platform that allows users
							to create, share, and manage forms and collect responses. The
							service includes features such as:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Form creation and customization tools</li>
							<li>• Response collection and management</li>
							<li>• Data analytics and reporting</li>
							<li>• User authentication and access controls</li>
							<li>• Integration capabilities</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							3. User Accounts and Registration
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							To use certain features of our service, you must register and
							create an account. You agree to:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Provide accurate and complete registration information</li>
							<li>• Keep your login credentials secure and confidential</li>
							<li>• Notify us immediately of any unauthorized use</li>
							<li>
								• Take responsibility for all activities under your account
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							4. Acceptable Use Policy
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							You agree not to use FormMaster to:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Violate any applicable laws or regulations</li>
							<li>• Infringe on intellectual property rights</li>
							<li>• Collect sensitive personal information without consent</li>
							<li>• Distribute spam, malware, or harmful content</li>
							<li>• Impersonate others or misrepresent yourself</li>
							<li>• Interfere with or disrupt our services</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							5. Content and Data Ownership
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							You retain ownership of all content and data you create or upload
							to FormMaster. By using our service, you grant us a limited
							license to process, store, and display your content as necessary
							to provide the service.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							6. Service Availability
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							While we strive to maintain high availability, we do not guarantee
							that our service will be available 100% of the time. We may
							experience downtime for maintenance, updates, or unforeseen
							circumstances.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							7. Limitation of Liability
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							FormMaster shall not be liable for any indirect, incidental,
							special, consequential, or punitive damages, including without
							limitation, loss of profits, data, use, goodwill, or other
							intangible losses.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							8. Termination
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We may terminate or suspend your account and access to the service
							immediately, without prior notice, for conduct that we believe
							violates these Terms of Service or is harmful to other users, us,
							or third parties.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							9. Changes to Terms
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We reserve the right to modify or replace these Terms at any time.
							If a revision is material, we will try to provide at least 30 days
							notice prior to any new terms taking effect.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							10. Contact Information
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							If you have any questions about these Terms of Service, please
							contact us at:{" "}
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

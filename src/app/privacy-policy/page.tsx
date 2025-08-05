import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy - FormMaster",
	description: "FormMaster's privacy policy and data protection practices",
};

export default function PrivacyPolicyPage() {
	return (
		<div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<h1 className="mb-4 font-bold text-4xl text-foreground">
						Privacy Policy
					</h1>
					<p className="text-muted-foreground">Last updated: December 2024</p>
				</div>

				<div className="prose prose-gray dark:prose-invert max-w-none">
					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							1. Information We Collect
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							When you use FormMaster, we collect information that you provide
							directly to us, such as when you create an account, build forms,
							or contact our support team.
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Account information (name, email address, password)</li>
							<li>• Form data and responses you create or submit</li>
							<li>• Profile information and preferences</li>
							<li>• Communication data when you contact us</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							2. How We Use Your Information
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We use the information we collect to provide, maintain, and
							improve our services, including:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Providing and maintaining the FormMaster service</li>
							<li>• Processing and storing your forms and responses</li>
							<li>• Sending you technical notices and support messages</li>
							<li>• Improving our service and developing new features</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							3. Information Sharing
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We do not sell, trade, or otherwise transfer your personal
							information to third parties without your consent, except as
							described in this policy:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• With your explicit consent</li>
							<li>• To comply with legal obligations</li>
							<li>• To protect our rights and safety</li>
							<li>
								• With trusted service providers who assist our operations
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							4. Data Security
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We implement appropriate security measures to protect your
							personal information against unauthorized access, alteration,
							disclosure, or destruction. This includes:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Encryption of data in transit and at rest</li>
							<li>• Regular security assessments and updates</li>
							<li>• Access controls and authentication measures</li>
							<li>• Secure cloud infrastructure (AWS, Cloudflare)</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							5. Your Rights
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							You have the right to:
						</p>
						<ul className="mb-4 space-y-2 text-muted-foreground">
							<li>• Access your personal information</li>
							<li>• Correct inaccurate information</li>
							<li>• Delete your account and data</li>
							<li>• Export your data</li>
							<li>• Opt-out of communications</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							6. Data Retention
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We retain your information for as long as your account is active
							or as needed to provide you services. We will delete your
							information upon account deletion, except where we are required to
							retain it by law.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							7. Changes to This Policy
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							We may update this privacy policy from time to time. We will
							notify you of any changes by posting the new policy on this page
							and updating the "last updated" date.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 font-semibold text-2xl text-foreground">
							8. Contact Us
						</h2>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							If you have any questions about this privacy policy, please
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

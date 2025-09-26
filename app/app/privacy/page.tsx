import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description: 'Privacy policy for Dovely - Modern Web Development Blog.',
};

export default function PrivacyPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<header className="mb-8">
				<h1 className="text-4xl font-bold text-foreground mb-4">
					Privacy Policy
				</h1>
				<p className="text-muted-foreground">
					Last updated: January 2024
				</p>
			</header>
			
			<article className="prose prose-slate dark:prose-invert max-w-none">
				<section>
					<h2>Information We Collect</h2>
					<p>
						We collect information you provide directly to us, such as when you create an account, 
						subscribe to our newsletter, or contact us.
					</p>
				</section>
				
				<section>
					<h2>How We Use Your Information</h2>
					<p>
						We use the information we collect to provide, maintain, and improve our services, 
						communicate with you, and comply with legal obligations.
					</p>
				</section>
				
				<section>
					<h2>Contact Us</h2>
					<p>
						If you have any questions about this Privacy Policy, please contact us at privacy@dovely.live.
					</p>
				</section>
			</article>
		</div>
	);
}

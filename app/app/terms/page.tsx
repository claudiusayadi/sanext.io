import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms of Service',
	description: 'Terms of service for Dovely - Modern Web Development Blog.',
};

export default function TermsPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<header className="mb-8">
				<h1 className="text-4xl font-bold text-foreground mb-4">
					Terms of Service
				</h1>
				<p className="text-muted-foreground">
					Last updated: January 2024
				</p>
			</header>
			
			<article className="prose prose-slate dark:prose-invert max-w-none">
				<section>
					<h2>Acceptance of Terms</h2>
					<p>
						By accessing and using this website, you accept and agree to be bound by the terms 
						and provision of this agreement.
					</p>
				</section>
				
				<section>
					<h2>Use License</h2>
					<p>
						Permission is granted to temporarily download one copy of the materials on Dovely's 
						website for personal, non-commercial transitory viewing only.
					</p>
				</section>
				
				<section>
					<h2>Contact Information</h2>
					<p>
						If you have any questions about these Terms of Service, please contact us at legal@dovely.live.
					</p>
				</section>
			</article>
		</div>
	);
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Posts',
	description: 'Browse all blog posts about web development, AI, architecture, frontend technologies, and security.',
};

export default function PostsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<header className="mb-8">
				<h1 className="text-4xl font-bold text-foreground mb-4">
					Blog Posts
				</h1>
				<p className="text-lg text-muted-foreground">
					Discover the latest in web development, AI, architecture, frontend technologies, and security best practices.
				</p>
			</header>
			
			<section aria-label="Blog posts">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{/* Posts will be loaded from Sanity here */}
					<article className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
						<h2 className="text-xl font-semibold mb-2">
							Sample Post Title
						</h2>
						<p className="text-muted-foreground mb-4">
							This is a sample post description. In a real implementation, this would be loaded from your Sanity CMS.
						</p>
						<time className="text-sm text-muted-foreground">
							January 15, 2024
						</time>
					</article>
				</div>
			</section>
		</div>
	);
}

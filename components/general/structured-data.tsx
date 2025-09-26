interface StructuredDataProps {
	type: 'website' | 'blog' | 'article';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
	let structuredData;

	switch (type) {
		case 'website':
			structuredData = {
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'Dovely',
				description: 'Modern Web Development Blog',
				url: 'https://dovely.live',
				publisher: {
					'@type': 'Organization',
					name: 'Dovely',
					logo: {
						'@type': 'ImageObject',
						url: 'https://dovely.live/logo.svg',
					},
				},
				potentialAction: {
					'@type': 'SearchAction',
					target: {
						'@type': 'EntryPoint',
						urlTemplate: 'https://dovely.live/search?q={search_term_string}',
					},
					'query-input': 'required name=search_term_string',
				},
			};
			break;

		case 'blog':
			structuredData = {
				'@context': 'https://schema.org',
				'@type': 'Blog',
				name: 'Dovely Blog',
				description:
					'Modern Web Development Blog featuring articles on web development, AI, architecture, frontend technologies, and security.',
				url: 'https://dovely.live',
				publisher: {
					'@type': 'Organization',
					name: 'Dovely',
					logo: {
						'@type': 'ImageObject',
						url: 'https://dovely.live/logo.svg',
					},
				},
				mainEntityOfPage: {
					'@type': 'WebPage',
					'@id': 'https://dovely.live',
				},
			};
			break;

		case 'article':
			structuredData = {
				'@context': 'https://schema.org',
				'@type': 'BlogPosting',
				headline: data.title,
				description: data.description,
				image: data.image ? [data.image] : [],
				datePublished: data.publishedAt,
				dateModified: data.updatedAt || data.publishedAt,
				author: {
					'@type': 'Person',
					name: data.author?.name || 'Dovely Team',
					url: data.author?.url || 'https://dovely.live',
				},
				publisher: {
					'@type': 'Organization',
					name: 'Dovely',
					url: 'https://dovely.live',
					logo: {
						'@type': 'ImageObject',
						url: 'https://dovely.live/logo.svg',
						width: 200,
						height: 200,
					},
				},
				mainEntityOfPage: {
					'@type': 'WebPage',
					'@id': data.url,
				},
				url: data.url,
				articleSection: data.categories || [],
				keywords: data.keywords || [],
				inLanguage: 'en-US',
				isPartOf: {
					'@type': 'Blog',
					'@id': 'https://dovely.live',
					name: 'Dovely Blog',
				},
				wordCount: data.wordCount || 500,
			};
			break;

		default:
			return null;
	}

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
			}}
		/>
	);
}

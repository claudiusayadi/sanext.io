import { PortableText, type SanityDocument } from 'next-sanity';
import { client, urlFor } from '@/app/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/general/structured-data';
import type { Metadata } from 'next';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]
{
 _id,
  title,
	mainImage,
	author->{
    _id,
    name
  },
	categories[]->{
    _id,
    title
  },
	content,
	publishedAt
}`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);

	if (!post) {
		return {
			title: 'Post Not Found',
			description: 'The requested blog post could not be found.',
		};
	}

	const description = post.content?.[0]?.children?.[0]?.text?.slice(0, 160) || `A blog post about ${post.title}`;
	const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1200).height(630).url() : null;

	return {
		title: post.title,
		description,
		keywords: post.categories?.map((cat: { title: string }) => cat.title) || [],
		authors: [{ name: post.author?.name || 'Dovely Team' }],
		openGraph: {
			title: post.title,
			description,
			type: 'article',
			publishedTime: post.publishedAt,
			modifiedTime: post._updatedAt || post.publishedAt,
			authors: [post.author?.name || 'Dovely Team'],
			images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : [],
			url: `https://dovely.live/${slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description,
			images: imageUrl ? [imageUrl] : [],
		},
		alternates: {
			canonical: `https://dovely.live/${slug}`,
		},
	};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);
	const postImageUrl = post.mainImage ? urlFor(post.mainImage)?.width(550).height(310).url() : null;

	if (!post) {
		return (
			<main className='container mx-auto min-h-screen max-w-3xl p-8'>
				<h1 className='text-4xl font-bold mb-8'>Post not found</h1>
				<Link href='/' className='hover:underline'>
					← Back to posts
				</Link>
			</main>
		);
	}

	// Prepare structured data
	const structuredDataProps = {
		title: post.title,
		description: post.content?.[0]?.children?.[0]?.text?.slice(0, 160) || `A blog post about ${post.title}`,
		author: post.author.name,
		publishedAt: post.publishedAt,
		updatedAt: post._updatedAt,
		url: `https://dovely.live/${slug}`,
		image: postImageUrl,
		keywords: post.categories?.map((cat: { title: string }) => cat.title) || [],
		slug: slug,
	};

	return (
		<main className='container mx-auto min-h-screen max-w-3xl p-8'>
			<StructuredData type='article' data={structuredDataProps} />

			<nav className='mb-8'>
				<Link
					href='/'
					className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'>
					<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
					</svg>
					Back to posts
				</Link>
			</nav>

			<article className='flex flex-col gap-6'>
				{postImageUrl && (
					<div className='bg-muted rounded-xl overflow-hidden'>
						<Image
							src={postImageUrl}
							alt={`Cover image for ${post.title}`}
							width={550}
							height={310}
							className='aspect-video rounded-xl w-full object-cover'
						/>
					</div>
				)}

				<header className='border-b border-border pb-6'>
					<h1 className='text-4xl font-bold mb-4 text-foreground'>{post.title}</h1>

					<div className='flex items-center gap-4 text-muted-foreground mb-6'>
						{post.author && (
							<div>
								<span>By </span>
								<span className='font-medium text-foreground'>{post.author.name}</span>
							</div>
						)}
						<time dateTime={post.publishedAt} className='text-sm'>
							Published:{' '}
							{new Date(post.publishedAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
					</div>

					{post.categories && post.categories.length > 0 && (
						<div className='flex gap-2 flex-wrap'>
							{post.categories.map((category: { _id: string; title: string }) => (
								<span
									key={category._id}
									className='bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm'>
									{category.title}
								</span>
							))}
						</div>
					)}
				</header>

				<div className='prose prose-lg prose-neutral dark:prose-invert max-w-none'>
					{Array.isArray(post.content) && <PortableText value={post.content} />}
				</div>
			</article>
		</main>
	);
}

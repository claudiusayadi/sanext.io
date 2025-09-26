import Link from 'next/link';
import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';
import { client, urlFor } from '@/app/sanity/client';
import { StructuredData } from '@/app/components/general/structured-data';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)
{
  _id,
  title,
	'slug': slug.current,
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

export default async function Home() {
	const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

	return (
		<div className='container mx-auto px-4 py-8'>
			<StructuredData type='blog' data={{}} />

			<header className='mb-12 text-center'>
				<h1 className='text-5xl font-bold text-foreground mb-4'>Welcome to Dovely</h1>
				<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
					Discover the latest in web development, AI, architecture, frontend technologies, and security best practices.
					Expert insights and tutorials for modern developers.
				</p>
			</header>

			<section aria-labelledby='recent-posts-heading'>
				<h2 id='recent-posts-heading' className='text-3xl font-bold mb-8'>
					Recent Posts
				</h2>

				{posts.length > 0 ? (
					<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none'>
						{posts.map((post: SanityDocument) => (
							<li key={post._id}>
								<article className='border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full'>
									<Link href={`/${post.slug}`} className='h-full flex flex-col group'>
										{post.mainImage && (
											<div className='aspect-video overflow-hidden bg-muted'>
												<Image
													src={urlFor(post.mainImage)?.width(550).height(310).url()}
													alt={`Cover image for ${post.title}`}
													width={550}
													height={310}
													className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
												/>
											</div>
										)}

										<div className='p-6 flex-1 flex flex-col'>
											<header className='mb-4'>
												<h3 className='text-xl font-semibold text-foreground mb-2 line-clamp-2'>{post.title}</h3>
												<div className='flex items-center gap-4 text-sm text-muted-foreground'>
													{post.author && <span>By {post.author.name}</span>}
													<time dateTime={post.publishedAt}>
														{new Date(post.publishedAt).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'long',
															day: 'numeric',
														})}
													</time>
													<span>{Math.ceil((post.content?.length || 0) / 200)} min read</span>
												</div>
											</header>

											<div className='flex-1'>
												<p className='text-muted-foreground mb-4 line-clamp-3'>
													{post.content?.[0]?.children?.[0]?.text?.slice(0, 150)}...
												</p>
											</div>

											{post.categories && post.categories.length > 0 && (
												<div className='flex gap-2 flex-wrap mt-auto'>
													{post.categories.map((category: { _id: string; title: string }) => (
														<span
															key={category._id}
															className='bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs'>
															{category.title}
														</span>
													))}
												</div>
											)}
										</div>
									</Link>
								</article>
							</li>
						))}
					</ul>
				) : (
					<div className='text-center py-12'>
						<p className='text-muted-foreground text-lg'>No posts available yet. Check back soon for new content!</p>
					</div>
				)}
			</section>
		</div>
	);
}

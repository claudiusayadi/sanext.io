import { MetadataRoute } from 'next';
import { client } from '@/app/sanity/client';

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] {
  slug,
  publishedAt,
  _updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(POSTS_QUERY);

  const postUrls = posts.map((post: any) => ({
    url: `https://dovely.live/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://dovely.live',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://dovely.live/posts',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://dovely.live/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://dovely.live/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...postUrls,
  ];
}

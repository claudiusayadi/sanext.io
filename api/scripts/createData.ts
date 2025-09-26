import {faker} from '@faker-js/faker'
import pLimit from 'p-limit'
import type {SanityDocumentLike} from 'sanity'
import {getCliClient} from 'sanity/cli'
import * as fs from 'fs'
import * as path from 'path'

const client = getCliClient()
const limit = pLimit(1)

// Sample authors and categories data
const AUTHORS_DATA = [
  {
    name: 'John Doe',
    slug: {current: 'john-doe'},
    bio: [
      {
        _type: 'block',
        _key: 'bio1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Senior full-stack developer with 8+ years of experience in modern web technologies.',
          },
        ],
      },
    ],
  },
  {
    name: 'Jane Smith',
    slug: {current: 'jane-smith'},
    bio: [
      {
        _type: 'block',
        _key: 'bio2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Frontend specialist and UI/UX enthusiast passionate about creating beautiful user experiences.',
          },
        ],
      },
    ],
  },
  {
    name: 'Mike Johnson',
    slug: {current: 'mike-johnson'},
    bio: [
      {
        _type: 'block',
        _key: 'bio3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'DevOps engineer and cloud architecture expert with a focus on scalable solutions.',
          },
        ],
      },
    ],
  },
]

const CATEGORIES_DATA = [
  {
    title: 'Web Development',
    description: 'Articles about modern web development practices, frameworks, and tools.',
  },
  {
    title: 'Artificial Intelligence',
    description: 'Insights into AI technologies and their applications in software development.',
  },
  {
    title: 'Architecture',
    description: 'Software architecture patterns, microservices, and system design principles.',
  },
  {
    title: 'Frontend',
    description: 'Frontend development techniques, CSS, and user interface design.',
  },
  {
    title: 'Security',
    description: 'Web security best practices, vulnerabilities, and protection strategies.',
  },
]

async function loadPostsFromFiles(): Promise<any[]> {
  const postsDir = path.join(process.cwd(), 'posts')
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.json'))

  const posts = []
  for (const file of files) {
    const filePath = path.join(postsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const postData = JSON.parse(content)
    posts.push(postData)
  }

  return posts
}

async function createData() {
  console.log(`Creating data with:`)
  console.log(`Project ID: ${client.config().projectId}`)
  console.log(`Dataset: ${client.config().dataset}`)

  // Delete previously created fake content
  console.log(`Deleting previously created demo content...`)
  await client.delete({query: `*[_type in ["post", "author", "category"] && fake == true]`})

  // Create authors with images
  console.log(`Creating authors with images...`)
  const authors: SanityDocumentLike[] = []

  for (let i = 0; i < AUTHORS_DATA.length; i++) {
    const authorData = AUTHORS_DATA[i]

    // Upload a profile image for each author
    console.log(`Uploading image for author ${i + 1}: ${authorData.name}...`)
    const imageUrl = faker.image.avatarGitHub()
    const imageBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer())
    const imageAsset = await client.assets.upload('image', Buffer.from(imageBuffer))

    authors.push({
      _type: 'author',
      _id: faker.string.uuid(),
      ...authorData,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
      fake: true,
    })
  }

  // Create categories with fake flag
  const categories: SanityDocumentLike[] = CATEGORIES_DATA.map((categoryData) => ({
    _type: 'category',
    _id: faker.string.uuid(),
    ...categoryData,
    fake: true,
  }))

  // Create authors first
  const authorsTransaction = client.transaction()
  for (const author of authors) {
    authorsTransaction.create(author)
  }

  const authorsBatch = limit(async () => {
    return authorsTransaction
      .commit()
      .then(() => {
        console.log(`Created ${authors.length} authors with images`)
      })
      .catch((err) => {
        console.error('Error creating authors:', err)
      })
  })

  // Create categories
  const categoriesTransaction = client.transaction()
  for (const category of categories) {
    categoriesTransaction.create(category)
  }

  const categoriesBatch = limit(async () => {
    return categoriesTransaction
      .commit()
      .then(() => {
        console.log(`Created ${categories.length} categories`)
      })
      .catch((err) => {
        console.error('Error creating categories:', err)
      })
  })

  // Load posts from JSON files
  console.log(`Loading posts from JSON files...`)
  const postsData = await loadPostsFromFiles()
  console.log(`Loaded ${postsData.length} posts from files`)

  // Create posts with images and references to authors and categories
  console.log(`Creating posts with images...`)
  const postsBatch = limit(async () => {
    const posts: SanityDocumentLike[] = []

    for (let i = 0; i < postsData.length; i++) {
      const postData = postsData[i]

      // Upload a random image for each post
      console.log(`Uploading image for post ${i + 1}...`)
      const imageUrl = faker.image.urlPicsumPhotos({width: 1200, height: 800})
      const imageBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer())
      const imageAsset = await client.assets.upload('image', Buffer.from(imageBuffer))

      // Randomly assign an author and category
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)]
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]

      posts.push({
        _type: 'post',
        _id: faker.string.uuid(),
        title: postData.title,
        slug: postData.slug,
        author: {
          _type: 'reference',
          _ref: randomAuthor._id,
        },
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
        categories: [
          {
            _type: 'reference',
            _ref: randomCategory._id,
            _key: faker.string.uuid(),
          },
        ],
        publishedAt: postData.publishedAt,
        content: postData.content,
        fake: true,
      })
    }

    const postsTransaction = client.transaction()
    for (const post of posts) {
      postsTransaction.create(post)
    }

    return postsTransaction
      .commit()
      .then(() => {
        console.log(`Created ${posts.length} posts with images`)
        console.log(`All content creation complete!`)
      })
      .catch((err) => {
        console.error('Error creating posts:', err)
      })
  })

  // Execute all batches
  await Promise.all([authorsBatch, categoriesBatch, postsBatch])
}

createData()

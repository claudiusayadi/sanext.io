# Sanity Demo Content Generator

This script creates demo content for your Sanity project by loading post data from JSON files and creating associated authors and categories.

## Usage

Run the script with the Sanity CLI:

```bash
npx sanity@latest exec scripts/createData.ts --with-user-token
```

## What it does

1. **Deletes existing demo content**: Removes all documents with `fake: true` flag
2. **Creates authors**: Generates 3 sample authors with:
   - Professional bios
   - **Profile images**: GitHub avatar-style images from Faker.js
3. **Creates categories**: Generates 5 sample categories with descriptions
4. **Creates posts**: Loads post data from JSON files in the `posts/` folder and creates posts with:
   - Random author assignments
   - Random category assignments
   - **High-quality images**: Downloads and uploads random images from Picsum Photos (1200x800px)
   - Proper content structure matching your post schema

## Post JSON Structure

Each post JSON file should follow this structure:

```json
{
  "title": "Your Post Title",
  "slug": {
    "current": "your-post-slug"
  },
  "publishedAt": "2024-01-15T10:00:00.000Z",
  "content": [
    {
      "_type": "block",
      "_key": "unique-key",
      "style": "normal",
      "children": [
        {
          "_type": "span",
          "_key": "unique-span-key",
          "text": "Your content text here"
        }
      ]
    }
  ]
}
```

## Adding More Posts

To add more posts:

1. Create new JSON files in the `posts/` folder
2. Follow the structure shown above
3. Run the script again

The script will automatically load all `.json` files from the `posts/` folder.

## Safety Features

- All created content is marked with `fake: true` for easy identification
- Running the script multiple times will clean up previous demo content
- Only affects documents marked as demo content, leaving your real content untouched

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  contentHtml?: string;
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        category: matterResult.data.category,
        tags: matterResult.data.tags || [],
        excerpt: matterResult.data.excerpt,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    category: matterResult.data.category,
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt,
    contentHtml,
  };
}

export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getSortedPostsData();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags);
}

export function getPostsByCategory(category: string): PostData[] {
  const posts = getSortedPostsData();
  return posts.filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): PostData[] {
  const posts = getSortedPostsData();
  return posts.filter((post) => post.tags.includes(tag));
}

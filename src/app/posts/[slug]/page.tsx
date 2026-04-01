import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getAllPostIds, PostData } from '@/lib/posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return {
      title: '文章未找到',
    };
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: PostData;

  try {
    post = await getPostData(slug);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            ← 返回首页
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <article className="bg-white p-8 rounded-lg shadow-sm">
          {/* Post Header */}
          <header className="mb-8 border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>{post.date}</span>
              <Link
                href={`/category/${encodeURIComponent(post.category)}`}
                className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              >
                {post.category}
              </Link>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="text-sm text-gray-500 hover:text-blue-600"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        </article>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/"
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            ← 返回首页
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500">
          <p>&copy; 2024 我的博客. Powered by Next.js & GitHub Pages.</p>
        </div>
      </footer>
    </div>
  );
}

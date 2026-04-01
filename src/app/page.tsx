import Link from 'next/link';
import { getSortedPostsData, getAllCategories, getAllTags } from '@/lib/posts';

export default function Home() {
  const posts = getSortedPostsData();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">我的博客</h1>
          <p className="mt-2 text-gray-600">记录学习与生活</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">分类</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
            >
              全部
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
                className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        {/* Tags */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">标签</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Posts List */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">文章列表</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <Link href={`/posts/${post.id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                </Link>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {post.category}
                  </span>
                </div>
                <p className="mt-3 text-gray-600">{post.excerpt}</p>
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
              </article>
            ))}
          </div>
        </section>
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

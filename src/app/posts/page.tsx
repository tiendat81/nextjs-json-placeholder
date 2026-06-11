import { getPosts } from "@/lib/api";
import Link from "next/link";
import { UserCircle, ArrowRight, Plus } from "lucide-react";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Posts
        </h1>
        <Link
          href="/posts/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="mr-1 h-5 w-5" />
          Create Post
        </Link>
      </div>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Browse all posts from JSONPlaceholder API
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <UserCircle className="h-4 w-4" />
              <span>User {post.userId}</span>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 capitalize dark:text-white">
              {post.title}
            </h2>
            <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-400">
              {post.body}
            </p>
            <Link
              href={`/posts/${post.id}`}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Read more
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
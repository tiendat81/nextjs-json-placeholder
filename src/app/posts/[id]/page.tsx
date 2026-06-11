import { getPost, getUser, getCommentsByPost } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, UserCircle, MessageSquare, Pencil } from "lucide-react";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const postId = parseInt(id);
  
  const [post, user, comments] = await Promise.all([
    getPost(postId),
    getUser(postId).catch(() => null), // Post userId might not match user id
    getCommentsByPost(postId),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/posts"
        className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Posts
      </Link>

      <article className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UserCircle className="h-4 w-4" />
            <span>User {post.userId}</span>
          </div>
          <Link
            href={`/posts/${post.id}/edit`}
            className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <Pencil className="mr-1 h-4 w-4" />
            Edit
          </Link>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold text-gray-900 capitalize dark:text-white">
          {post.title}
        </h1>
        
        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          {post.body}
        </p>
      </article>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h2>
        <Link
          href={`/posts/${post.id}/comments`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all comments
          <MessageSquare className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {comments.slice(0, 3).map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-white">
                {comment.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({comment.email})
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {comment.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
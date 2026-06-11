import { getComments, getCommentsByPostId, getPost } from "@/lib/api";
import Link from "next/link";
import { Mail, MessageSquare, ArrowLeft } from "lucide-react";

interface CommentsPageProps {
  searchParams: Promise<{ postId?: string }>;
}

export default async function CommentsPage({ searchParams }: CommentsPageProps) {
  const { postId } = await searchParams;
  const postIdNum = postId ? parseInt(postId) : null;
  
  const [comments, post] = await Promise.all([
    postIdNum ? getCommentsByPostId(postIdNum) : getComments(),
    postIdNum ? getPost(postIdNum).catch(() => null) : null,
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Comments
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        {postIdNum 
          ? `Comments for Post #${postIdNum}` 
          : "Browse all comments from JSONPlaceholder API"}
      </p>

      {postIdNum && post && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            Post #{postIdNum}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 capitalize dark:text-white">
            {post.title}
          </h2>
          <Link
            href={`/posts/${postIdNum}`}
            className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View full post
            <ArrowLeft className="ml-1 h-3 w-3 rotate-180" />
          </Link>
        </div>
      )}

      {postIdNum && (
        <Link
          href="/comments"
          className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          View all comments
        </Link>
      )}

      <div className="grid gap-4">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {comment.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="h-3 w-3" />
                <a
                  href={`mailto:${comment.email}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {comment.email}
                </a>
              </div>
            </div>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              {comment.body}
            </p>
            <Link
              href={`/posts/${comment.postId}`}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              View Post #{comment.postId}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
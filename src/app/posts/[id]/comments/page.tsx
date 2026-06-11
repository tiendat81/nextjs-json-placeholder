import { getPost, getCommentsByPost } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, UserCircle, Mail } from "lucide-react";

interface CommentsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CommentsPage({ params }: CommentsPageProps) {
  const { id } = await params;
  const postId = parseInt(id);
  
  const [post, comments] = await Promise.all([
    getPost(postId),
    getCommentsByPost(postId),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/posts/${postId}`}
        className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Post
      </Link>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <UserCircle className="h-4 w-4" />
          <span>User {post.userId}</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 capitalize dark:text-white">
          {post.title}
        </h1>
      </div>

      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        All Comments ({comments.length})
      </h2>

      <div className="space-y-4">
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
            <p className="text-gray-700 dark:text-gray-300">
              {comment.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
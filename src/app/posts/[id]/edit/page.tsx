"use client";

import { use, useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updatePost, deletePost } from "@/lib/actions";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({
    id: 0,
    title: "",
    body: "",
    userId: 1,
  });

  // Fetch post data on mount
  useEffect(() => {
    const id = parseInt(resolvedParams.id);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData({
          id: data.id,
          title: data.title,
          body: data.body,
          userId: data.userId,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load post data");
        console.error(err);
        setLoading(false);
      });
  }, [resolvedParams.id]);

  async function handleUpdate(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await updatePost(postData.id, formData);
        toast.success("Post updated successfully!");
        router.push(`/posts/${postData.id}`);
      } catch (err) {
        setError("Failed to update post. Please try again.");
        toast.error("Failed to update post. Please try again.");
        console.error(err);
      }
    });
  }

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deletePost(postData.id);
        toast.success("Post deleted successfully!");
        router.push("/posts");
      } catch (err) {
        setError("Failed to delete post. Please try again.");
        toast.error("Failed to delete post. Please try again.");
        console.error(err);
      }
    });
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-6 h-6 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-4 h-8 w-48 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-6">
            <div className="h-12 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-12 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-32 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/posts/${postData.id}`}
        className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Post
      </Link>

      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Edit Post
      </h1>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form action={handleUpdate} className="max-w-2xl space-y-6">
        <div>
          <label
            htmlFor="userId"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            User ID
          </label>
          <input
            type="number"
            id="userId"
            name="userId"
            defaultValue={postData.userId}
            min={1}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={postData.title}
            placeholder="Enter post title..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="body"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Body
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={6}
            defaultValue={postData.body}
            placeholder="Enter post content..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isPending ? "Updating..." : "Update Post (PUT)"}
          </button>
          <Link
            href={`/posts/${postData.id}`}
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="ml-auto rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Delete Post
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-600"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use server";

import { revalidatePath } from "next/cache";
import type { Post } from "@/types";

const API_BASE = "https://jsonplaceholder.typicode.com";

// Create a new post
export async function createPost(formData: FormData): Promise<Post> {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const userId = parseInt(formData.get("userId") as string);

  const response = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  const post = await response.json();
  revalidatePath("/posts");
  return post;
}

// Update a post (PUT - full update)
export async function updatePost(id: number, formData: FormData): Promise<Post> {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const userId = parseInt(formData.get("userId") as string);

  const response = await fetch(`${API_BASE}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      body,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  const post = await response.json();
  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
  return post;
}

// Partial update a post (PATCH)
export async function patchPost(id: number, data: Partial<Post>): Promise<Post> {
  const response = await fetch(`${API_BASE}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to patch post");
  }

  const post = await response.json();
  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
  return post;
}

// Delete a post
export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  revalidatePath("/posts");
}
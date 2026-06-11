import type { User, Post, Comment, Album, Photo, Todo } from "@/types";

const API_BASE = "https://jsonplaceholder.typicode.com";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  console.log(`[Server] Fetching: ${url}`);
  
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const data = await response.json();
  console.log(`[Server] Response from ${endpoint}:`, JSON.stringify(data).slice(0, 200) + '...');
  
  return data;
}

// Users
export async function getUsers(): Promise<User[]> {
  return fetchAPI<User[]>("/users");
}

export async function getUser(id: number): Promise<User> {
  return fetchAPI<User>(`/users/${id}`);
}

// Posts
export async function getPosts(): Promise<Post[]> {
  return fetchAPI<Post[]>("/posts");
}

export async function getPost(id: number): Promise<Post> {
  return fetchAPI<Post>(`/posts/${id}`);
}

export async function getPostsByUser(userId: number): Promise<Post[]> {
  return fetchAPI<Post[]>(`/users/${userId}/posts`);
}

// Comments
export async function getComments(): Promise<Comment[]> {
  return fetchAPI<Comment[]>("/comments");
}

export async function getCommentsByPost(postId: number): Promise<Comment[]> {
  return fetchAPI<Comment[]>(`/posts/${postId}/comments`);
}

export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  return fetchAPI<Comment[]>(`/comments?postId=${postId}`);
}

// Albums
export async function getAlbums(): Promise<Album[]> {
  return fetchAPI<Album[]>("/albums");
}

export async function getAlbum(id: number): Promise<Album> {
  return fetchAPI<Album>(`/albums/${id}`);
}

export async function getAlbumsByUser(userId: number): Promise<Album[]> {
  return fetchAPI<Album[]>(`/users/${userId}/albums`);
}

// Photos
export async function getPhotos(): Promise<Photo[]> {
  return fetchAPI<Photo[]>("/photos");
}

export async function getPhotosByAlbum(albumId: number): Promise<Photo[]> {
  return fetchAPI<Photo[]>(`/albums/${albumId}/photos`);
}

// Todos
export async function getTodos(): Promise<Todo[]> {
  return fetchAPI<Todo[]>("/todos");
}

export async function getTodosByUser(userId: number): Promise<Todo[]> {
  return fetchAPI<Todo[]>(`/users/${userId}/todos`);
}
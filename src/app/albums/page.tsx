import { getAlbums } from "@/lib/api";
import Link from "next/link";
import { UserCircle, Images, ArrowRight } from "lucide-react";

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Albums
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Browse photo albums from JSONPlaceholder API
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {albums.map((album) => (
          <article
            key={album.id}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-3 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Images className="h-10 w-10 text-white" />
            </div>
            <h2 className="mb-2 font-semibold text-gray-900 capitalize dark:text-white line-clamp-2">
              {album.title}
            </h2>
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <UserCircle className="h-4 w-4" />
              <span>User {album.userId}</span>
            </div>
            <Link
              href={`/albums/${album.id}`}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Photos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
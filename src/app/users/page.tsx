import { getUsers } from "@/lib/api";
import Link from "next/link";
import { Mail, Phone, Globe, Building2 } from "lucide-react";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Users
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        View all users from JSONPlaceholder API
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <article
            key={user.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{user.username}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${user.email}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {user.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${user.phone}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {user.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Globe className="h-4 w-4" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {user.website}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Building2 className="h-4 w-4" />
                <span>{user.company.name}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>

            <Link
              href={`/users/${user.id}`}
              className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Profile
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
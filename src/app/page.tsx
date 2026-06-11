import Link from "next/link";
import { FileText, Users, Images, CheckSquare, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Posts",
    description: "Browse posts from JSONPlaceholder API",
    href: "/posts",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    title: "Users",
    description: "View user profiles and their details",
    href: "/users",
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "Albums",
    description: "Explore photo albums",
    href: "/albums",
    icon: Images,
    color: "bg-purple-500",
  },
  {
    title: "Todos",
    description: "Check out todo items",
    href: "/todos",
    icon: CheckSquare,
    color: "bg-orange-500",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          JSONPlaceholder App
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          A Next.js application showcasing the JSONPlaceholder API with App
          Router, TypeScript, and Tailwind CSS
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/posts"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://jsonplaceholder.typicode.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            API Documentation
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Explore the API
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className={`mb-4 inline-flex rounded-lg ${feature.color} p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400">
                  <span className="text-sm font-medium">View {feature.title}</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <h2 className="mb-6 text-center text-2xl font-bold">
          JSONPlaceholder Resources
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <p className="text-4xl font-bold">100</p>
            <p className="text-blue-200">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">10</p>
            <p className="text-blue-200">Users</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">100</p>
            <p className="text-blue-200">Albums</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">200</p>
            <p className="text-blue-200">Todos</p>
          </div>
        </div>
      </section>
    </div>
  );
}
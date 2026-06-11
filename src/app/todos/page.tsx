import { getTodos } from "@/lib/api";
import { CheckSquare, Square, UserCircle } from "lucide-react";

export default async function TodosPage() {
  const todos = await getTodos();

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Todos
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Manage todos from JSONPlaceholder API
      </p>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {todos.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-green-600">
            {completedTodos.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Completed
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl font-bold text-orange-600">
            {pendingTodos.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Pending
          </div>
        </div>
      </div>

      {/* Todos List */}
      <div className="space-y-6">
        {/* Pending Section */}
        {pendingTodos.length > 0 && (
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <Square className="h-5 w-5 text-orange-500" />
              Pending ({pendingTodos.length})
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {pendingTodos.slice(0, 20).map((todo) => (
                <div
                  key={todo.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-2 flex items-start gap-3">
                    <Square className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <p className="text-gray-900 capitalize dark:text-white">
                      {todo.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <UserCircle className="h-3 w-3" />
                    <span>User {todo.userId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Section */}
        {completedTodos.length > 0 && (
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <CheckSquare className="h-5 w-5 text-green-500" />
              Completed ({completedTodos.length})
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {completedTodos.slice(0, 20).map((todo) => (
                <div
                  key={todo.id}
                  className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20"
                >
                  <div className="mb-2 flex items-start gap-3">
                    <CheckSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <p className="text-gray-900 capitalize line-through dark:text-white">
                      {todo.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <UserCircle className="h-3 w-3" />
                    <span>User {todo.userId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
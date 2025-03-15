const ContestLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="animate-pulse rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      >
        <div className="h-1 bg-gray-300 dark:bg-gray-700" />
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
export default ContestLoadingSkeleton;
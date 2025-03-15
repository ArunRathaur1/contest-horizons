import { useState, useEffect } from "react";
import { SearchIcon, FilterIcon, X } from "lucide-react";

const FilterBar = ({ filters, setFilters }) => {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ ...filters, searchQuery });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const togglePlatform = (platform) => {
    const updatedPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];

    setFilters({ ...filters, platforms: updatedPlatforms });
  };

  const toggleStatus = (status) => {
    const updatedStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];

    setFilters({ ...filters, status: updatedStatus });
  };

  const clearFilters = () => {
    setFilters({ platforms: [], status: [], searchQuery: "" });
    setSearchQuery("");
  };

  const hasActiveFilters =
    filters.platforms.length > 0 ||
    filters.status.length > 0 ||
    filters.searchQuery;

  return (
    <div className="animate-fade-in w-full mb-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="pl-10 w-full h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Search contests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          <FilterIcon className="h-4 w-4" />
          <span>Filters:</span>
        </div>

        {["Codeforces", "CodeChef", "LeetCode"].map((platform) => (
          <button
            key={platform}
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              filters.platforms.includes(platform)
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => togglePlatform(platform)}
          >
            {platform}
          </button>
        ))}

        {["UPCOMING", "ONGOING", "PAST"].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              filters.status.includes(status)
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => toggleStatus(status)}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 transition-all"
            onClick={clearFilters}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;

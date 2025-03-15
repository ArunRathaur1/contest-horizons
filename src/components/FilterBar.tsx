
import { useState, useEffect } from "react";
import { SearchIcon, FilterIcon, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterBarProps {
  filters: {
    platforms: string[];
    status: string[];
    searchQuery: string;
  };
  setFilters: (filters: {
    platforms: string[];
    status: string[];
    searchQuery: string;
  }) => void;
}

const FilterBar = ({ filters, setFilters }: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ ...filters, searchQuery });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters, setFilters]);

  const togglePlatform = (platform: string) => {
    const updatedPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];

    setFilters({ ...filters, platforms: updatedPlatforms });
  };

  const toggleStatus = (status: string) => {
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
    <Card className="p-4 mb-6">
      <div className="space-y-4">
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

        <div className="space-y-2">
          <div className="flex items-center space-x-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            <FilterIcon className="h-4 w-4" />
            <span>Platform Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {["Codeforces", "CodeChef", "LeetCode"].map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox 
                  id={`platform-${platform}`}
                  checked={filters.platforms.includes(platform)}
                  onCheckedChange={() => togglePlatform(platform)}
                />
                <label 
                  htmlFor={`platform-${platform}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {platform}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>Contest Status:</span>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="all" 
                onClick={() => setFilters({ ...filters, status: [] })}
                className={filters.status.length === 0 ? "bg-primary text-primary-foreground" : ""}
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming" 
                onClick={() => setFilters({ ...filters, status: ["UPCOMING"] })}
                className={filters.status.includes("UPCOMING") ? "bg-primary text-primary-foreground" : ""}
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                onClick={() => setFilters({ ...filters, status: ["PAST"] })}
                className={filters.status.includes("PAST") ? "bg-primary text-primary-foreground" : ""}
              >
                Past
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FilterBar;

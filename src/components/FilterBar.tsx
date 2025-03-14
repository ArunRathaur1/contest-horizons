
import { useState, useEffect } from 'react';
import { Platform, ContestStatus, FilterState } from '../utils/types';
import { SearchIcon, FilterIcon, X } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const FilterBar = ({ filters, setFilters }: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  
  // Update search query with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ ...filters, searchQuery });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Toggle platform filter
  const togglePlatform = (platform: Platform) => {
    const platformIndex = filters.platforms.indexOf(platform);
    let updatedPlatforms: Platform[];
    
    if (platformIndex > -1) {
      // Remove platform if already selected
      updatedPlatforms = [...filters.platforms];
      updatedPlatforms.splice(platformIndex, 1);
    } else {
      // Add platform if not selected
      updatedPlatforms = [...filters.platforms, platform];
    }
    
    setFilters({
      ...filters,
      platforms: updatedPlatforms
    });
  };
  
  // Toggle status filter
  const toggleStatus = (status: ContestStatus) => {
    const statusIndex = filters.status.indexOf(status);
    let updatedStatus: ContestStatus[];
    
    if (statusIndex > -1) {
      // Remove status if already selected
      updatedStatus = [...filters.status];
      updatedStatus.splice(statusIndex, 1);
    } else {
      // Add status if not selected
      updatedStatus = [...filters.status, status];
    }
    
    setFilters({
      ...filters,
      status: updatedStatus
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      platforms: [],
      status: [],
      searchQuery: '',
    });
    setSearchQuery('');
  };
  
  // Check if any filters are active
  const hasActiveFilters = filters.platforms.length > 0 || filters.status.length > 0 || filters.searchQuery.length > 0;
  
  return (
    <div className="animate-fade-in w-full mb-6 space-y-4">
      {/* Search bar */}
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
            onClick={() => setSearchQuery('')}
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
          </button>
        )}
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          <FilterIcon className="h-4 w-4" />
          <span>Filters:</span>
        </div>
        
        {/* Platform filters */}
        <button
          className={`px-3 py-1 text-sm rounded-full transition-all ${
            filters.platforms.includes('Codeforces') 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => togglePlatform('Codeforces')}
        >
          Codeforces
        </button>
        
        <button
          className={`px-3 py-1 text-sm rounded-full transition-all ${
            filters.platforms.includes('CodeChef') 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => togglePlatform('CodeChef')}
        >
          CodeChef
        </button>
        
        <button
          className={`px-3 py-1 text-sm rounded-full transition-all ${
            filters.platforms.includes('LeetCode') 
              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => togglePlatform('LeetCode')}
        >
          LeetCode
        </button>
        
        {/* Status filters */}
        <button
          className={`px-3 py-1 text-sm rounded-full transition-all ${
            filters.status.includes(ContestStatus.UPCOMING) 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => toggleStatus(ContestStatus.UPCOMING)}
        >
          Upcoming
        </button>
        
        <button
          className={`px-3 py-1 text-sm rounded-full transition-all ${
            filters.status.includes(ContestStatus.ONGOING) 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => toggleStatus(ContestStatus.ONGOING)}
        >
          Ongoing
        </button>
        
        <button
          className={`px-3 py-1 text-sm rounded-full transition-all ${
            filters.status.includes(ContestStatus.PAST) 
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => toggleStatus(ContestStatus.PAST)}
        >
          Past
        </button>
        
        {/* Clear filters button */}
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

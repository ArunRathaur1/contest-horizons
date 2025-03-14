
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ContestCard from '../components/ContestCard';
import EmptyState from '../components/EmptyState';
import { useContests } from '../hooks/useContests';
import { FilterState, Contest, ContestStatus } from '../utils/types';
import { Skeleton } from '../components/ui/skeleton';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    platforms: [],
    status: [],
    searchQuery: ''
  });
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  const { contests, loading } = useContests(bookmarks);
  
  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('contestBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);
  
  // Update contests when bookmarks change
  useEffect(() => {
    // Save bookmarks to localStorage
    localStorage.setItem('contestBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  // Handle bookmark toggle
  const handleBookmarkToggle = (contestId: string) => {
    setBookmarks(prevBookmarks => {
      if (prevBookmarks.includes(contestId)) {
        return prevBookmarks.filter(id => id !== contestId);
      } else {
        return [...prevBookmarks, contestId];
      }
    });
  };
  
  // Apply filters to contests
  const filteredContests = contests.filter(contest => {
    // Apply platform filter
    if (filters.platforms.length > 0 && !filters.platforms.includes(contest.platform)) {
      return false;
    }
    
    // Apply status filter
    if (filters.status.length > 0 && !filters.status.includes(contest.status)) {
      return false;
    }
    
    // Apply search query filter
    if (filters.searchQuery && !contest.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Separate contests by status
  const upcomingContests = filteredContests.filter(contest => contest.status === ContestStatus.UPCOMING);
  const ongoingContests = filteredContests.filter(contest => contest.status === ContestStatus.ONGOING);
  const pastContests = filteredContests.filter(contest => contest.status === ContestStatus.PAST);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-1 animate-fade-in">Contest Horizons</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 animate-fade-in">
            Track, filter, and bookmark programming contests.
          </p>
          
          <FilterBar filters={filters} setFilters={setFilters} />
          
          {loading ? (
            <ContestLoadingSkeleton />
          ) : filteredContests.length === 0 ? (
            <EmptyState 
              type="search" 
              message="No contests match your current filters."
            />
          ) : (
            <div className="space-y-8">
              {/* Ongoing Contests */}
              {ongoingContests.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-amber-600 dark:text-amber-500 animate-fade-in">
                    Ongoing Contests
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ongoingContests.map((contest, index) => (
                      <ContestCard 
                        key={contest.id}
                        contest={contest}
                        onBookmarkToggle={() => handleBookmarkToggle(contest.id)}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upcoming Contests */}
              {upcomingContests.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-500 animate-fade-in">
                    Upcoming Contests
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingContests.map((contest, index) => (
                      <ContestCard 
                        key={contest.id}
                        contest={contest}
                        onBookmarkToggle={() => handleBookmarkToggle(contest.id)}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Past Contests */}
              {pastContests.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-500 animate-fade-in">
                    Past Contests
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastContests.map((contest, index) => (
                      <ContestCard 
                        key={contest.id}
                        contest={contest}
                        onBookmarkToggle={() => handleBookmarkToggle(contest.id)}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Loading skeleton component
const ContestLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="animate-pulse rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
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

export default App;

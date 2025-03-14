
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ContestCard from '../components/ContestCard';
import EmptyState from '../components/EmptyState';

// Define types
export enum ContestStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  PAST = 'PAST'
}

export interface Contest {
  id: string;
  platform: string;
  name: string;
  url: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: ContestStatus;
  isBookmarked: boolean;
}

export interface FilterState {
  platforms: string[];
  status: ContestStatus[];
  searchQuery: string;
}

function App() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    platforms: [],
    status: [],
    searchQuery: ''
  });
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  const fetchContests = async () => {
    try {
      setLoading(true);
      
      // Fetch contests from the CodeChef API
      const response = await fetch('https://codechef-api.vercel.app/contests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch contests');
      }
      
      const data = await response.json();
      
      // Process the data
      const processedContests: Contest[] = [];
      
      // Process ongoing contests
      data.ongoing_contests.forEach((contest: any) => {
        processedContests.push({
          id: `codechef-${contest.contest_code}`,
          platform: 'CodeChef',
          name: contest.contest_name,
          url: `https://www.codechef.com/${contest.contest_code}`,
          startTime: new Date(contest.contest_start_date).toISOString(),
          endTime: new Date(contest.contest_end_date).toISOString(),
          duration: (new Date(contest.contest_end_date).getTime() - new Date(contest.contest_start_date).getTime()) / 1000,
          status: ContestStatus.ONGOING,
          isBookmarked: bookmarks.includes(`codechef-${contest.contest_code}`)
        });
      });
      
      // Process upcoming contests
      data.future_contests.forEach((contest: any) => {
        processedContests.push({
          id: `codechef-${contest.contest_code}`,
          platform: 'CodeChef',
          name: contest.contest_name,
          url: `https://www.codechef.com/${contest.contest_code}`,
          startTime: new Date(contest.contest_start_date).toISOString(),
          endTime: new Date(contest.contest_end_date).toISOString(),
          duration: (new Date(contest.contest_end_date).getTime() - new Date(contest.contest_start_date).getTime()) / 1000,
          status: ContestStatus.UPCOMING,
          isBookmarked: bookmarks.includes(`codechef-${contest.contest_code}`)
        });
      });
      
      // Process past contests
      data.past_contests.forEach((contest: any) => {
        processedContests.push({
          id: `codechef-${contest.contest_code}`,
          platform: 'CodeChef',
          name: contest.contest_name,
          url: `https://www.codechef.com/${contest.contest_code}`,
          startTime: new Date(contest.contest_start_date).toISOString(),
          endTime: new Date(contest.contest_end_date).toISOString(),
          duration: (new Date(contest.contest_end_date).getTime() - new Date(contest.contest_start_date).getTime()) / 1000,
          status: ContestStatus.PAST,
          isBookmarked: bookmarks.includes(`codechef-${contest.contest_code}`)
        });
      });
      
      setContests(processedContests);
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
    
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('contestBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    
    // Set up a refresh interval (every 5 minutes)
    const refreshInterval = setInterval(fetchContests, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Update contests when bookmarks change
  useEffect(() => {
    setContests(prevContests => 
      prevContests.map(contest => ({
        ...contest,
        isBookmarked: bookmarks.includes(contest.id)
      }))
    );
    
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
  
  // Loading skeleton
  const LoadingSkeleton = () => (
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
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-1 animate-fade-in">Contest Horizons</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 animate-fade-in">
            Track, filter, and bookmark CodeChef programming contests.
          </p>
          
          <FilterBar filters={filters} setFilters={setFilters} />
          
          {loading ? (
            <LoadingSkeleton />
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

export default App;
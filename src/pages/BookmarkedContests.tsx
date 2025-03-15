
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ContestCard from '../components/ContestCard';
import EmptyState from '../components/EmptyState';
import { BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookmarkedContests = () => {
  const [bookmarkedContests, setBookmarkedContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    platforms: [],
    status: [],
    searchQuery: ''
  });
  
  // Fetch bookmarked contests
  useEffect(() => {
    setLoading(true);
    const contests ="";
    setLoading(false);
  }, []);
  
  // Handle bookmark toggle
  const handleBookmarkToggle = (contestId: string) => {
    // Remove from bookmarks
    setBookmarkedContests(prevContests => {
      const updatedContests = prevContests.filter(contest => contest.id !== contestId);
      
      // Update localStorage
      localStorage.setItem('bookmarkedContests', JSON.stringify(updatedContests));
      
      return updatedContests;
    });
  };
  
  // Apply filters to contests
  const filteredContests = bookmarkedContests.filter(contest => {
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
  
  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
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
          <div className="flex items-center mb-1 animate-fade-in">
            <BookmarkCheck className="text-primary h-7 w-7 mr-2" />
            <h1 className="text-3xl font-bold">Bookmarked Contests</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6 animate-fade-in">
            Your saved contests for quick access.
          </p>
          
          <FilterBar filters={filters} setFilters={setFilters} />
          
          {loading ? (
            <LoadingSkeleton />
          ) : bookmarkedContests.length === 0 ? (
            <EmptyState 
              type="bookmarks" 
              action={
                <Link 
                  to="/" 
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Browse Contests
                </Link>
              }
            />
          ) : filteredContests.length === 0 ? (
            <EmptyState 
              type="search" 
              message="No bookmarked contests match your current filters."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredContests.map((contest, index) => (
                <ContestCard 
                  key={contest.id}
                  contest={contest}
                  onBookmarkToggle={() => handleBookmarkToggle(contest.id)}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookmarkedContests;


import { useState, useEffect } from 'react';
import { Contest } from '../utils/types';
import { fetchContests } from '../services/contestService';

export function useContests(bookmarks: string[] = []) {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getContests = async () => {
      try {
        setLoading(true);
        const data = await fetchContests();
        
        // Apply bookmarks to contests
        const contestsWithBookmarks = data.map(contest => ({
          ...contest,
          isBookmarked: bookmarks.includes(contest.id)
        }));
        
        setContests(contestsWithBookmarks);
      } catch (err) {
        console.error("Error fetching contests:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    getContests();
    
    // Set up a refresh interval (every 5 minutes)
    const refreshInterval = setInterval(() => getContests(), 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [bookmarks]);

  // Update contests when bookmarks change
  useEffect(() => {
    setContests(prevContests => 
      prevContests.map(contest => ({
        ...contest,
        isBookmarked: bookmarks.includes(contest.id)
      }))
    );
  }, [bookmarks]);

  return { contests, loading, error };
}

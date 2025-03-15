
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ContestList from "../components/ContestList";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const API_URLS = {
  codeforces: "http://localhost:5000/api/contest/codeforces",
  leetcode: "http://localhost:5000/api/contest/leetcode",
  codechef: "http://localhost:5000/api/contest/codechef",
};

const BookmarkedContests = () => {
  const [bookmarkedContests, setBookmarkedContests] = useState({
    codeforces: { upcoming: [], past: [] },
    leetcode: { upcoming: [], past: [] },
    codechef: { upcoming: [], past: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get bookmarks from local storage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem("contestBookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (contestId: string) => {
    const newBookmarks = bookmarks.filter(id => id !== contestId);
    setBookmarks(newBookmarks);
    localStorage.setItem("contestBookmarks", JSON.stringify(newBookmarks));
  };

  useEffect(() => {
    async function fetchBookmarkedContests() {
      if (bookmarks.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Fetch all contests first
        const [cfRes, lcRes, ccRes] = await Promise.all([
          fetch(API_URLS.codeforces).then((res) => res.json()),
          fetch(API_URLS.leetcode).then((res) => res.json()),
          fetch(API_URLS.codechef).then((res) => res.json()),
        ]);

        // Helper to filter bookmarked contests
        const filterBookmarked = (contests) => {
          if (!contests) return [];
          
          return contests.filter(contest => {
            const contestId = contest.id || `${contest.name || contest.contestName}-${contest.startTime || contest.time}`;
            return bookmarks.includes(contestId);
          }).map(contest => ({
            ...contest,
            id: contest.id || `${contest.name || contest.contestName}-${contest.startTime || contest.time}`,
            isBookmarked: true
          }));
        };

        setBookmarkedContests({
          codeforces: {
            upcoming: filterBookmarked(cfRes.upcomingContests),
            past: filterBookmarked(cfRes.pastContests),
          },
          leetcode: {
            upcoming: filterBookmarked(lcRes.upcomingContests),
            past: filterBookmarked(lcRes.pastContests),
          },
          codechef: {
            upcoming: filterBookmarked(ccRes.upcomingContests),
            past: filterBookmarked(ccRes.pastContests),
          },
        });
      } catch (err) {
        setError("Failed to load bookmarked contests.");
        console.error("Error fetching bookmarked contests:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarkedContests();
  }, [bookmarks]);

  // Check if there are any bookmarked contests
  const hasBookmarks = Object.values(bookmarkedContests).some(
    platform => platform.upcoming.length > 0 || platform.past.length > 0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Bookmarked Contests</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {!loading && !hasBookmarks && (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <BookmarkIcon className="h-16 w-16 text-gray-400" />
              <h2 className="text-xl font-semibold">No bookmarked contests yet</h2>
              <p className="text-gray-500 max-w-md">
                Browse contests and click the bookmark icon to save them for quick access.
              </p>
              <Button asChild>
                <Link to="/">Browse Contests</Link>
              </Button>
            </div>
          </Card>
        )}

        {/* Upcoming Bookmarked Contests */}
        {bookmarkedContests.codeforces.upcoming.length > 0 && (
          <ContestList
            title="Bookmarked Codeforces Contests"
            contests={bookmarkedContests.codeforces.upcoming}
            loading={loading}
            platform="codeforces"
            onBookmarkToggle={toggleBookmark}
          />
        )}

        {bookmarkedContests.leetcode.upcoming.length > 0 && (
          <ContestList
            title="Bookmarked LeetCode Contests"
            contests={bookmarkedContests.leetcode.upcoming}
            loading={loading}
            platform="leetcode"
          />
        )}

        {bookmarkedContests.codechef.upcoming.length > 0 && (
          <ContestList
            title="Bookmarked CodeChef Contests"
            contests={bookmarkedContests.codechef.upcoming}
            loading={loading}
            platform="codechef"
            onBookmarkToggle={toggleBookmark}
          />
        )}

        {/* Past Bookmarked Contests */}
        {bookmarkedContests.codeforces.past.length > 0 && (
          <ContestList
            title="Bookmarked Past Codeforces Contests"
            contests={bookmarkedContests.codeforces.past}
            loading={loading}
            platform="codeforces"
            onBookmarkToggle={toggleBookmark}
          />
        )}
        
        {bookmarkedContests.leetcode.past.length > 0 && (
          <ContestList
            title="Bookmarked Past LeetCode Contests"
            contests={bookmarkedContests.leetcode.past}
            loading={loading}
            platform="leetcode"
          />
        )}
        
        {bookmarkedContests.codechef.past.length > 0 && (
          <ContestList
            title="Bookmarked Past CodeChef Contests"
            contests={bookmarkedContests.codechef.past}
            loading={loading}
            platform="codechef"
            onBookmarkToggle={toggleBookmark}
          />
        )}
      </div>
    </div>
  );
};

export default BookmarkedContests;

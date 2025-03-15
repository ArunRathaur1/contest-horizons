
import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import ContestList from "../components/ContestList";
import { filterContests } from "../utils/filterUtils";
import Navbar from '../components/Navbar';
const API_URLS = {
  codeforces: "http://localhost:5000/api/contest/codeforces",
  leetcode: "http://localhost:5000/api/contest/leetcode",
  codechef: "http://localhost:5000/api/contest/codechef",
};

function Contests() {
  const [contests, setContests] = useState({
    codeforces: { upcoming: [], past: [] },
    leetcode: { upcoming: [], past: [] },
    codechef: { upcoming: [], past: [] },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    platforms: [],
    status: [],
    searchQuery: "",
  });

  // Bookmark states (local storage in this example)
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("contestBookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (contestId) => {
    const newBookmarks = bookmarks.includes(contestId)
      ? bookmarks.filter(id => id !== contestId)
      : [...bookmarks, contestId];
    
    setBookmarks(newBookmarks);
    localStorage.setItem("contestBookmarks", JSON.stringify(newBookmarks));
  };

  useEffect(() => {
    async function fetchContests() {
      setLoading(true);

      try {
        // Make parallel API calls
        const [cfRes, lcRes, ccRes] = await Promise.all([
          fetch(API_URLS.codeforces).then((res) => res.json()),
          fetch(API_URLS.leetcode).then((res) => res.json()),
          fetch(API_URLS.codechef).then((res) => res.json()),
        ]);

        // Add bookmark status to contests
        const processContests = (contestArray, isBookmarked) => {
          return contestArray.map(contest => ({
            ...contest,
            id: contest.id || `${contest.name || contest.contestName}-${contest.startTime || contest.time}`,
            isBookmarked: isBookmarked(contest)
          }));
        };

        const isBookmarked = (contest) => {
          const contestId = contest.id || `${contest.name || contest.contestName}-${contest.startTime || contest.time}`;
          return bookmarks.includes(contestId);
        };

        setContests({
          codeforces: {
            upcoming: cfRes.success ? processContests(cfRes.upcomingContests || [], isBookmarked) : [],
            past: cfRes.success ? processContests(cfRes.pastContests || [], isBookmarked) : [],
          },
          leetcode: {
            upcoming: lcRes.success ? processContests(lcRes.upcomingContests || [], isBookmarked) : [],
            past: lcRes.success ? processContests(lcRes.pastContests || [], isBookmarked) : [],
          },
          codechef: {
            upcoming: ccRes.success ? processContests(ccRes.upcomingContests || [], isBookmarked) : [],
            past: ccRes.success ? processContests(ccRes.pastContests || [], isBookmarked) : [],
          },
        });
      } catch (err) {
        setError("Failed to load contests.");
        console.error("Error fetching contests:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchContests();
  }, [bookmarks]);

  // Apply filters
  const filteredContests = filterContests(
    contests,
    filters.platforms,
    filters.status,
    filters.searchQuery
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Competitive Programming Contests</h1>
        
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Error message if any */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Upcoming Contests */}
        <ContestList
          title="Upcoming Codeforces Contests"
          contests={filteredContests.codeforces.upcoming}
          loading={loading}
          platform="codeforces"
          emptyMessage="No upcoming Codeforces contests found."
          onBookmarkToggle={toggleBookmark}
        />

        <ContestList
          title="Upcoming LeetCode Contests"
          contests={filteredContests.leetcode.upcoming}
          loading={loading}
          platform="leetcode"
          emptyMessage="No upcoming LeetCode contests found."
        />

        <ContestList
          title="Upcoming CodeChef Contests"
          contests={filteredContests.codechef.upcoming}
          loading={loading}
          platform="codechef"
          emptyMessage="No upcoming CodeChef contests found."
          onBookmarkToggle={toggleBookmark}
        />

        {/* Past Contests */}
        <ContestList
          title="Past Codeforces Contests"
          contests={filteredContests.codeforces.past}
          loading={loading}
          platform="codeforces"
          emptyMessage="No past Codeforces contests found."
          onBookmarkToggle={toggleBookmark}
        />

        <ContestList
          title="Past LeetCode Contests"
          contests={filteredContests.leetcode.past}
          loading={loading}
          platform="leetcode"
          emptyMessage="No past LeetCode contests found."
        />

        <ContestList
          title="Past CodeChef Contests"
          contests={filteredContests.codechef.past}
          loading={loading}
          platform="codechef"
          emptyMessage="No past CodeChef contests found."
          onBookmarkToggle={toggleBookmark}
        />
      </div>
    </div>
  );
}

export default Contests;

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import FilterBar from "../components/FilterBar";
import ContestList from "../components/ContestList";
import { filterContests } from "../utils/filterUtils";
import Navbar from '../components/Navbar';

const API_URLS = {
  codeforces: "http://localhost:5000/api/contest/codeforces",
  leetcode: "http://localhost:5000/api/contest/leetcode",
  codechef: "http://localhost:5000/api/contest/codechef",
};

// Helper functions for reliable cookie storage
const saveContestsToStorage = (contests) => {
  try {
    // Use localStorage instead of cookies for reliable object storage
    localStorage.setItem("contestData", JSON.stringify(contests));
    return true;
  } catch (err) {
    console.error("Error saving contests to storage:", err);
    return false;
  }
};

const loadContestsFromStorage = () => {
  try {
    const saved = localStorage.getItem("contestData");
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error("Error loading contests from storage:", err);
    return null;
  }
};

function Contests(props) {
  // Default data structure
  const defaultContests = {
    codeforces: { upcoming: [], past: [] },
    leetcode: { upcoming: [], past: [] },
    codechef: { upcoming: [], past: [] },
  };

  // Initialize contests from storage
  const [contests, setContests] = useState(() => {
    const savedContests = loadContestsFromStorage();
    return savedContests || defaultContests;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    platforms: [],
    status: [],
    searchQuery: "",
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("contestBookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing bookmarks:", error);
      localStorage.removeItem("contestBookmarks"); // Clear bad data
      return [];
    }
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
      const [cfRes, lcRes, ccRes, ytRes] = await Promise.all([
        fetch(API_URLS.codeforces).then((res) => res.json()),
        fetch(API_URLS.leetcode).then((res) => res.json()),
        fetch(API_URLS.codechef).then((res) => res.json()),
        fetch("http://localhost:5000/api/auth/getyoutube").then((res) => res.json()),
      ]);

      // Create a mapping of contest names to YouTube links
      const youtubeLinksMap = {};
      if (ytRes.success || ytRes.data) {
        // Use ytRes.data directly as it's the array of YouTube links
        const youtubeData = ytRes.data || [];
        youtubeData.forEach((yt) => {
          youtubeLinksMap[yt.name] = yt.link; // Mapping contest name -> YouTube link
        });
      }
      console.log(youtubeLinksMap);

      const processContests = (contestArray, platform) => {
        return contestArray.map(contest => {
          // Get contest name based on platform-specific property
          const contestName = contest.name || contest.contestName || "";
          const contestId = contest.id || `${contestName}-${contest.startTime || contest.time}`;
          
          return {
            ...contest,
            id: contestId,
            isBookmarked: bookmarks.includes(contestId),
            youtubeLink: youtubeLinksMap[contestName] || null, // Assign YouTube link if available
            platform // Add platform info for future reference
          };
        });
      };

      const updatedContests = {
        codeforces: {
          upcoming: cfRes.success ? processContests(cfRes.upcomingContests || [], 'codeforces') : [],
          past: cfRes.success ? processContests(cfRes.pastContests || [], 'codeforces') : [],
        },
        leetcode: {
          upcoming: lcRes.success ? processContests(lcRes.upcomingContests || [], 'leetcode') : [],
          past: lcRes.success ? processContests(lcRes.pastContests || [], 'leetcode') : [],
        },
        codechef: {
          upcoming: ccRes.success ? processContests(ccRes.upcomingContests || [], 'codechef') : [],
          past: ccRes.success ? processContests(ccRes.pastContests || [], 'codechef') : [],
        },
      };

      setContests(updatedContests);
      saveContestsToStorage(updatedContests);
      console.log("Contests with YouTube links:", updatedContests);
    } catch (err) {
      setError("Failed to load contests.");
      console.error("Error fetching contests:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchContests();
}, [bookmarks]);



  const filteredContests = filterContests(
    contests,
    filters.platforms,
    filters.status,
    filters.searchQuery
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Competitive Programming Contests</h1>
        <FilterBar filters={filters} setFilters={setFilters} />
        {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
        <ContestList title="Upcoming Codeforces Contests" contests={filteredContests.codeforces.upcoming} loading={loading} platform="codeforces" emptyMessage="No upcoming Codeforces contests found." onBookmarkToggle={toggleBookmark} token={props.token} />
        <ContestList title="Upcoming LeetCode Contests" contests={filteredContests.leetcode.upcoming} loading={loading} platform="leetcode" emptyMessage="No upcoming LeetCode contests found." onBookmarkToggle={toggleBookmark} token={props.token} />
        <ContestList title="Upcoming CodeChef Contests" contests={filteredContests.codechef.upcoming} loading={loading} platform="codechef" emptyMessage="No upcoming CodeChef contests found." onBookmarkToggle={toggleBookmark} token={props.token} />
        <ContestList title="Past Codeforces Contests" contests={filteredContests.codeforces.past} loading={loading} platform="codeforces" emptyMessage="No past Codeforces contests found." onBookmarkToggle={toggleBookmark} token={props.token} />
        <ContestList title="Past LeetCode Contests" contests={filteredContests.leetcode.past} loading={loading} platform="leetcode" emptyMessage="No past LeetCode contests found." onBookmarkToggle={toggleBookmark} token={props.token} />
        <ContestList title="Past CodeChef Contests" contests={filteredContests.codechef.past} loading={loading} platform="codechef" emptyMessage="No past CodeChef contests found." onBookmarkToggle={toggleBookmark} token={props.token} />
      </div>
    </div>
  );
}

export default Contests;
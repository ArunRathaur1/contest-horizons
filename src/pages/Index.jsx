import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CodeForces from "../components/cardcodeforces";
import ContestLoadingSkeleton from "./contestloading";
import CodeChef_past from "../components/codechefcard";
import Codechef_upcomming from '../components/codechefupcomming';
import LeetcodeUpcooming from '../components/leetcodeupcomming';
import PastContestCard from '../components/leetcodepast';

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

        console.log("Codeforces API Response:", cfRes);
        console.log("LeetCode API Response:", lcRes);
        console.log("CodeChef API Response:", ccRes);

        setContests({
          codeforces: cfRes.success
            ? { upcoming: cfRes.upcomingContests || [], past: cfRes.pastContests || [] }
            : { upcoming: [], past: [] },

          leetcode: lcRes.success
            ? { upcoming: lcRes.upcomingContests || [], past: lcRes.pastContests || [] }
            : { upcoming: [], past: [] },

          codechef: ccRes.success
            ? { upcoming: ccRes.upcomingContests || [], past: ccRes.pastContests || [] }
            : { upcoming: [], past: [] },
        });
      } catch (err) {
        setError("Failed to load contests.");
        console.error("Error fetching contests:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchContests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Codeforces Contests */}
        <h2 className="text-3xl font-bold mb-4">Codeforces Contests</h2>
        {loading ? (
          <ContestLoadingSkeleton />
        ) : contests.codeforces.upcoming.length > 0 ? (
          contests.codeforces.upcoming.map((contest, index) => (
            <CodeForces key={index} contest={contest} />
          ))
        ) : (
          <p className="text-gray-500">No upcoming contests found.</p>
        )}

        {/* LeetCode Contests */}
        <h2 className="text-3xl font-bold mt-8 mb-4">LeetCode Contests</h2>
        {loading ? (
          <ContestLoadingSkeleton />
        ) : contests.leetcode.upcoming.length > 0 ? (
          contests.leetcode.upcoming.map((contest, index) => (
            <LeetcodeUpcooming key={index} {...contest} />
          ))
        ) : (
          <p className="text-gray-500">No upcoming contests found.</p>
        )}
        {loading ? (
          <ContestLoadingSkeleton />
        ) : contests.leetcode.past.length > 0 ? (
          contests.leetcode.past.map((contest, index) => (
            <PastContestCard key={index} {...contest} />
          ))
        ) : (
          <p className="text-gray-500">No past contests found.</p>
        )}

        {/* CodeChef Upcoming Contests */}
        <h2 className="text-3xl font-bold mt-8 mb-4">CodeChef Contests</h2>
        {loading ? (
          <ContestLoadingSkeleton />
        ) : contests.codechef.upcoming.length > 0 ? (
          contests.codechef.upcoming.map((contest, index) => (
            <Codechef_upcomming key={index} contest={contest} />
          ))
        ) : (
          <p className="text-gray-500">No upcoming contests found.</p>
        )}

        {/* CodeChef Past Contests */}
        <h2 className="text-3xl font-bold mt-8 mb-4">Past CodeChef Contests</h2>
        {loading ? (
          <ContestLoadingSkeleton />
        ) : contests.codechef.past.length > 0 ? (
          contests.codechef.past.map((contest, index) => (
            <CodeChef_past key={index} contest={contest} />
          ))
        ) : (
          <p className="text-gray-500">No past contests found.</p>
        )}
      </div>
    </div>
  );
}

export default Contests;
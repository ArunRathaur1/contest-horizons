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

  // Function to render contests section
  const renderContestSection = (title, data, Component, emptyMessage = "No contests found.") => (
    <>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {loading ? (
        <ContestLoadingSkeleton />
      ) : data.length > 0 ? (
        data.map((contest, index) => (
          <Component key={index} contest={contest} />
        ))
      ) : (
        <p className="text-gray-500">{emptyMessage}</p>
      )}
    </>
  );

  // Function to render contests section for LeetCode (different prop pattern)
  const renderLeetcodePast = (title, data, Component, emptyMessage = "No contests found.") => (
    <>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {loading ? (
        <ContestLoadingSkeleton />
      ) : data.length > 0 ? (
        data.map((contest, index) => (
          <Component key={index} {...contest} />
        ))
      ) : (
        <p className="text-gray-500">{emptyMessage}</p>
      )}
    </>
  );

  const renderLeetCodeupcomming = (title, data, Component, emptyMessage = "No contests found.") => (
  <>
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    {loading ? (
      <ContestLoadingSkeleton />
    ) : data.length > 0 ? (
      data.map((contest, index) => (
        <Component key={index} contest={contest} />
      ))
    ) : (
      <p className="text-gray-500">{emptyMessage}</p>
    )}
  </>
);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Codeforces Section */}
        <div className="mb-12">
          {renderContestSection(
            "Upcoming Codeforces Contests",
            contests.codeforces.upcoming,
            CodeForces,
            "No upcoming Codeforces contests found."
          )}
          
          {renderContestSection(
            "Past Codeforces Contests",
            contests.codeforces.past,
            CodeForces,
            "No past Codeforces contests found."
          )}
        </div>

        {/* LeetCode Section */}
        
        <div className="mb-12">
          {renderLeetCodeupcomming(
            "Upcoming LeetCode Contests",
            contests.leetcode.upcoming,
            LeetcodeUpcooming,
            "No upcoming LeetCode contests found."
          )}
          
          {renderLeetcodePast(
            "Past LeetCode Contests",
            contests.leetcode.past,
            PastContestCard,
            "No past LeetCode contests found."
          )}
        </div>

        {/* CodeChef Section */}
        <div className="mb-12">
          {renderContestSection(
            "Upcoming CodeChef Contests",
            contests.codechef.upcoming,
            Codechef_upcomming,
            "No upcoming CodeChef contests found."
          )}
          
          {renderContestSection(
            "Past CodeChef Contests",
            contests.codechef.past,
            CodeChef_past,
            "No past CodeChef contests found."
          )}
        </div>

        {/* Display error if any */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contests;
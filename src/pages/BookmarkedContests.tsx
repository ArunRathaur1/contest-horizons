import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";

const BookmarkedContests = ({ token }) => {
  const [bookmarkedContests, setBookmarkedContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedContests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/fetchuser",
          {
            method: "POST",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Fetched User Data:", data);

          const validContests = (data.bookmark || []).filter(
            (contest) => contest && (contest.name || contest.contestName)
          );

          setBookmarkedContests(validContests);
        } else {
          console.error(
            "Failed to fetch bookmarks:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching bookmarked contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedContests();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AppNavbar />
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Bookmarked Contests</h1>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bookmarked Contests</h1>
        {bookmarkedContests.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No bookmarked contests found.
          </p>
        ) : (
          <ul className="space-y-4">
            {bookmarkedContests.map((contest, index) => {
              const contestName =
                contest.name || contest.contestName || "Unnamed Contest";
              const contestLink = contest.link || contest.contestLink;
              const startTime =
                contest.formattedStartTime ||
                contest.time ||
                contest.timeInfo ||
                "Unknown";
              const duration = contest.formattedDuration || "N/A";
              const startsIn = contest.daysUntil
                ? `${contest.daysUntil} days`
                : contest.startsIn || "N/A";

              return (
                <li
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {contestName}
                  </h2>
                  {contestLink && (
                    <p>
                      <a
                        href={contestLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Contest Link
                      </a>
                    </p>
                  )}
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Start Time: {startTime}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Duration: {duration}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Starts In: {startsIn}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookmarkedContests;

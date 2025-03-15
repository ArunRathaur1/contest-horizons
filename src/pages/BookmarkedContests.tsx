import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import { Contest } from "@/utils/types";

const BookmarkedContests = () => {
  const [bookmarkedContests, setBookmarkedContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("contestBookmarks");
    if (savedBookmarks) {
      const bookmarkedIds = JSON.parse(savedBookmarks);
      // Fetch contest details based on bookmarkedIds (replace with your actual data fetching logic)
      // For now, let's assume you have a function to fetch contest details by ID
      const fetchContestDetails = async (id: string) => {
        // Replace this with your actual API endpoint
        // const response = await fetch(`/api/contests/${id}`);
        // const data = await response.json();
        // return data;

        // Mock data for demonstration
        return new Promise<Contest>((resolve) => {
          setTimeout(() => {
            resolve({
              id: id,
              name: `Contest ${id}`,
              url: "https://example.com",
              startTime: new Date().toISOString(),
              endTime: new Date().toISOString(),
              duration: "2 hours",
              platform: "Sample Platform",
              status: "UPCOMING",
              bookmarked: true,
            });
          }, 500); // Simulate API delay
        });
      };

      const loadBookmarkedContests = async () => {
        setLoading(true);
        const contests = await Promise.all(
          bookmarkedIds.map((id: string) => fetchContestDetails(id))
        );
        setBookmarkedContests(contests.filter(Boolean) as Contest[]);
        setLoading(false);
      };

      loadBookmarkedContests();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AppNavbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Bookmarked Contests</h1>
          <p>Loading...</p>
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
          <p>No bookmarked contests found.</p>
        ) : (
          <ul>
            {bookmarkedContests.map((contest) => (
              <li key={contest.id} className="mb-2 p-3 rounded shadow-sm bg-white dark:bg-gray-800">
                <a href={contest.url} target="_blank" rel="noopener noreferrer">
                  {contest.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookmarkedContests;

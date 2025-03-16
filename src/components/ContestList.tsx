import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import CodeForcesCard from "./cardcodeforces";
import CodeChefCard from "./codechefcard";
import LeetcodeUpcoming from "./leetcodeupcomming";
import PastContestCard from "./leetcodepast";
import ContestLoadingSkeleton from "../pages/contestloading";

interface ContestListProps {
  title: string;
  contests: any[];
  loading: boolean;
  platform: string;
  emptyMessage?: string;
}

const ContestList = ({
  title,
  contests,
  loading,
  platform,
  emptyMessage = "No contests found.",
}: ContestListProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); // Set token from local storage
  }, []);

  // Bookmark function
  const handleBookmark = async (contest: any) => {
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }

    try {
      const auth=token.slice(1,token.length-1);
      const response = await fetch("http://localhost:5000/api/auth/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify({ contest }), // Sending full contest object
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Successfully bookmarked contest:`, contest);
      } else {
        console.error(
          "Failed to bookmark contest:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error while bookmarking contest:", error);
    }
  };

  // Select the appropriate component based on platform
  const renderContest = (contest: any, index: number) => {
    return (
      <div key={contest.id || index} className="relative">
        {platform === "codeforces" && <CodeForcesCard contest={contest} />}
        {platform === "codechef" && <CodeChefCard contest={contest} />}
        {platform === "leetcode" &&
          (contest.startsIn ? (
            <LeetcodeUpcoming contest={contest} />
          ) : (
            <PastContestCard {...contest} />
          ))}

        {/* Bookmark Button */}
        <button
          className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
          onClick={() => handleBookmark(contest)} // Pass full contest object
          disabled={!token} // Disable button if token is not available
        >
          Bookmark
        </button>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {loading ? (
        <ContestLoadingSkeleton />
      ) : contests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contests.map((contest, index) => renderContest(contest, index))}
        </div>
      ) : (
        <Card className="p-6 text-center text-gray-500">{emptyMessage}</Card>
      )}
    </div>
  );
};

export default ContestList;

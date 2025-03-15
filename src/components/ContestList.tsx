
import React from "react";
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
  onBookmarkToggle?: (contestId: string) => void;
}

const ContestList: React.FC<ContestListProps> = ({
  title,
  contests,
  loading,
  platform,
  emptyMessage = "No contests found.",
  onBookmarkToggle,
}) => {
  // Select the appropriate component based on platform
  const renderContest = (contest: any, index: number) => {
    switch (platform) {
      case "codeforces":
        return (
          <CodeForcesCard 
            key={contest.id || index} 
            contest={contest} 
            onBookmarkToggle={() => onBookmarkToggle && onBookmarkToggle(contest.id)}
            index={index}
          />
        );
      case "codechef":
        return (
          <CodeChefCard 
            key={contest.id || index} 
            contest={contest} 
            onBookmarkToggle={() => onBookmarkToggle && onBookmarkToggle(contest.id)}
          />
        );
      case "leetcode":
        return contest.startsIn ? (
          <LeetcodeUpcoming 
            key={contest.id || index} 
            contest={contest} 
          />
        ) : (
          <PastContestCard 
            key={contest.id || index} 
            {...contest} 
          />
        );
      default:
        return null;
    }
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

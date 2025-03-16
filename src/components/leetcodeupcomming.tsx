import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock, LinkIcon } from "lucide-react";

const LeetcodeUpcoming = ({ contest }) => {
  // If contest is passed directly as props rather than as an object
  if (!contest) {
    return null;
  }

  const { contestName, startsIn, time, contestLink } = contest;
  return (
    <Card className="w-96 p-4 border border-gray-200 shadow-md rounded-2xl mb-4">
      <CardContent>
        <h2 className="text-xl font-semibold text-gray-800">{contestName}</h2>

        <div className="flex items-center mt-2 text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          <span>Starts in: {startsIn}</span>
        </div>

        <div className="flex items-center mt-2 text-gray-600">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span>{time}</span>
        </div>

        <a
          href={contestLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center text-blue-500 hover:underline"
        >
          <LinkIcon className="w-5 h-5 mr-2" />
          Register for Contest
        </a>
      </CardContent>
    </Card>
  );
};

export default LeetcodeUpcoming;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, LinkIcon } from "lucide-react";

const PastContestCard = ({ contestName, link, timeInfo,youtubeLink }) => {
  return (
    <Card className="w-96 p-4 border border-gray-200 shadow-md rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-semibold text-gray-800">{contestName}</h2>
        <div className="flex items-center mt-2 text-gray-600">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span>{timeInfo}</span>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center text-blue-500 hover:underline"
        >
          <LinkIcon className="w-5 h-5 mr-2" />
          View Contest
        </a>
        {youtubeLink != null && (
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            youtubeLink
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default PastContestCard;

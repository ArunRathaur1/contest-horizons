import { useState } from "react";
import {
  Clock,
  Calendar,
  ExternalLink,
  BookmarkIcon,
  BookmarkCheck,
} from "lucide-react";

const ContestCard = ({ contest, onBookmarkToggle, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const codeforcesColor = "#1F8ACB"; // Codeforces Blue
  const codeforcesLogo = "🔥"; // Placeholder emoji (replace with an actual logo if available)

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-transform duration-300 ${
        isHovered ? "transform -translate-y-1 shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Codeforces Branding Indicator */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: codeforcesColor }}
      />

      <div className="p-5">
        {/* Header - Platform */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{codeforcesLogo}</span>
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Codeforces
            </span>
          </div>
        </div>

        {/* Contest Title */}
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-gray-900 dark:text-white">
          {contest.name}
        </h3>

        {/* Contest Details */}
        <div className="space-y-2 mb-4 text-gray-600 dark:text-gray-300 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{contest.formattedStartTime}</span>
          </div>

          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{contest.formattedDuration}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <a
            href={contest.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Visit Contest <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </a>
          {contest.youtubeLink != null && (
            <a
              href={contest.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              youtubeLink
            </a>
          )}

          <button
            onClick={onBookmarkToggle}
            className={`transition-all duration-300 ${
              contest.isBookmarked
                ? "text-yellow-500 hover:text-yellow-600"
                : "text-gray-400 hover:text-yellow-500"
            }`}
          >
            {contest.isBookmarked ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <BookmarkIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;

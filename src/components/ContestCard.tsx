
import { useState } from 'react';
import { Contest } from '../utils/types';
import { 
  Clock, Calendar, ExternalLink, BookmarkIcon, Youtube, 
  BookmarkCheck
} from 'lucide-react';
import { formatRelativeTime, formatDuration, getPlatformColor, getPlatformLogo, toggleBookmark } from '../utils/api';

interface ContestCardProps {
  contest: Contest;
  onBookmarkToggle: () => void;
  index: number;
}

const ContestCard = ({ contest, onBookmarkToggle, index }: ContestCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const platformColor = getPlatformColor(contest.platform);
  const platformLogo = getPlatformLogo(contest.platform);
  
  const startDate = new Date(contest.startTime);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const statusBadgeClass = () => {
    switch (contest.status) {
      case 'upcoming':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100';
      case 'ongoing':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
      case 'past':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };
  
  const handleBookmarkClick = () => {
    toggleBookmark(contest);
    onBookmarkToggle();
  };
  
  return (
    <div 
      className={`animate-slide-up delay-${index % 3}00 card-hover relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : '',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Platform color indicator */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: platformColor }}
      />
      
      <div className="p-5">
        {/* Header - Platform + Status */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{platformLogo}</span>
            <span className="font-medium text-sm">{contest.platform}</span>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeClass()}`}>
            {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
          </div>
        </div>
        
        {/* Contest Title */}
        <h3 className="text-lg font-semibold mb-3 line-clamp-2">{contest.name}</h3>
        
        {/* Contest Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4 mr-2" />
            <span>Duration: {formatDuration(contest.duration)}</span>
          </div>
          
          <div className="flex items-center text-sm font-medium">
            <Clock className="h-4 w-4 mr-2" />
            <span>{formatRelativeTime(contest.startTime)}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <a 
            href={contest.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Visit <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </a>
          
          <div className="flex items-center space-x-3">
            {contest.solutionUrl && (
              <a 
                href={contest.solutionUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
              >
                Solution <Youtube className="h-3.5 w-3.5 ml-1" />
              </a>
            )}
            
            <button 
              onClick={handleBookmarkClick}
              className={`transition-all duration-300 ${
                contest.isBookmarked 
                  ? 'text-yellow-500 hover:text-yellow-600' 
                  : 'text-gray-400 hover:text-yellow-500'
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
    </div>
  );
};

export default ContestCard;

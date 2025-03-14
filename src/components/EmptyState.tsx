
import { ReactNode } from 'react';
import { SearchX, Bookmark, Calendar } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'bookmarks' | 'contests';
  message?: string;
  action?: ReactNode;
}

const EmptyState = ({ type, message, action }: EmptyStateProps) => {
  // Default messages for each type
  const defaultMessages = {
    search: "No contests match your search criteria.",
    bookmarks: "You haven't bookmarked any contests yet.",
    contests: "No contests available at the moment."
  };
  
  // Icons for each type
  const icons = {
    search: <SearchX className="h-12 w-12 text-gray-400" />,
    bookmarks: <Bookmark className="h-12 w-12 text-gray-400" />,
    contests: <Calendar className="h-12 w-12 text-gray-400" />
  };
  
  return (
    <div className="w-full py-10 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
        {icons[type]}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {message || defaultMessages[type]}
      </h3>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;

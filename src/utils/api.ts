
import { Contest, Platform, ContestStatus } from './types';

// Mock data for development
const mockContests: Contest[] = [
  {
    id: '1',
    name: 'Codeforces Round #839 (Div. 3)',
    platform: 'Codeforces',
    url: 'https://codeforces.com/contests/1176',
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // tomorrow
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 60 * 2).toISOString(), // tomorrow + 2hrs
    status: ContestStatus.UPCOMING,
    duration: 7200, // 2 hours
  },
  {
    id: '2',
    name: 'CodeChef Starters 47',
    platform: 'CodeChef',
    url: 'https://www.codechef.com/START47',
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 2 days from now
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 48 + 1000 * 60 * 60 * 3).toISOString(), // 2 days + 3hrs
    status: ContestStatus.UPCOMING,
    duration: 10800, // 3 hours
  },
  {
    id: '3',
    name: 'LeetCode Weekly Contest 305',
    platform: 'LeetCode',
    url: 'https://leetcode.com/contest/weekly-contest-305',
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(), // 3 days from now
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 72 + 1000 * 60 * 90).toISOString(), // 3 days + 1.5hrs
    status: ContestStatus.UPCOMING,
    duration: 5400, // 1.5 hours
  },
  {
    id: '4',
    name: 'Codeforces Educational Round 130',
    platform: 'Codeforces',
    url: 'https://codeforces.com/contests/1175',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 60 * 2).toISOString(), // yesterday + 2hrs
    status: ContestStatus.PAST,
    duration: 7200, // 2 hours
    solutionUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '5',
    name: 'CodeChef Starters 46',
    platform: 'CodeChef',
    url: 'https://www.codechef.com/START46',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 60 * 3).toISOString(), // 2 days ago + 3hrs
    status: ContestStatus.PAST,
    duration: 10800, // 3 hours
  },
  {
    id: '6',
    name: 'LeetCode Weekly Contest 304',
    platform: 'LeetCode',
    url: 'https://leetcode.com/contest/weekly-contest-304',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 72 + 1000 * 60 * 90).toISOString(), // 3 days ago + 1.5hrs
    status: ContestStatus.PAST,
    duration: 5400, // 1.5 hours
    solutionUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '7',
    name: 'Codeforces Round #838 (Div. 2)',
    platform: 'Codeforces',
    url: 'https://codeforces.com/contests/1174',
    startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    endTime: new Date(Date.now() + 1000 * 60 * 90).toISOString(), // 1.5 hours from now
    status: ContestStatus.ONGOING,
    duration: 7200, // 2 hours
  },
];

// Get contests from local storage or use mock data
export const getContests = async (): Promise<Contest[]> => {
  const bookmarked = getBookmarkedContests();
  const bookmarkedIds = bookmarked.map(contest => contest.id);
  
  // In a real app, this would fetch from an API
  return mockContests.map(contest => ({
    ...contest,
    isBookmarked: bookmarkedIds.includes(contest.id)
  }));
};

// Get bookmarked contests from localStorage
export const getBookmarkedContests = (): Contest[] => {
  try {
    const bookmarked = localStorage.getItem('bookmarkedContests');
    return bookmarked ? JSON.parse(bookmarked) : [];
  } catch (error) {
    console.error('Error retrieving bookmarked contests:', error);
    return [];
  }
};

// Toggle bookmark status for a contest
export const toggleBookmark = (contest: Contest): Contest[] => {
  try {
    const bookmarked = getBookmarkedContests();
    const index = bookmarked.findIndex(c => c.id === contest.id);
    
    if (index > -1) {
      // Remove from bookmarks
      bookmarked.splice(index, 1);
    } else {
      // Add to bookmarks
      bookmarked.push({...contest, isBookmarked: true});
    }
    
    localStorage.setItem('bookmarkedContests', JSON.stringify(bookmarked));
    return bookmarked;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return [];
  }
};

// Format relative time (e.g., "2 days ago", "in 3 hours")
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  const absSeconds = Math.abs(diffInSeconds);
  
  // Convert to appropriate unit
  const days = Math.floor(absSeconds / 86400);
  const hours = Math.floor((absSeconds % 86400) / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  
  if (diffInSeconds > 0) {
    // Future date
    if (days > 0) {
      return `in ${days}d ${hours}h`;
    } else if (hours > 0) {
      return `in ${hours}h ${minutes}m`;
    } else {
      return `in ${minutes}m`;
    }
  } else {
    // Past date
    if (days > 0) {
      return `${days}d ${hours}h ago`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    } else {
      return `${minutes}m ago`;
    }
  }
};

// Format duration (e.g., "2h 30m")
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  } else {
    return `${minutes}m`;
  }
};

// Get platform color
export const getPlatformColor = (platform: Platform): string => {
  switch (platform) {
    case 'Codeforces':
      return 'rgb(25, 118, 210)'; // Codeforces blue
    case 'CodeChef':
      return 'rgb(67, 83, 115)'; // CodeChef dark blue
    case 'LeetCode':
      return 'rgb(255, 161, 22)'; // LeetCode orange
    default:
      return 'rgb(107, 114, 128)'; // Gray
  }
};

export const getPlatformLogo = (platform: Platform): string => {
  switch (platform) {
    case 'Codeforces':
      return '🏆';
    case 'CodeChef':
      return '👨‍🍳';
    case 'LeetCode':
      return '💻';
    default:
      return '🔥';
  }
};

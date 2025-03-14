
import { Contest, ContestStatus, Platform } from '../utils/types';
import { getBookmarkedContests } from '../utils/api';

// Generate contest ID
const generateContestId = (platform: string, contestCode: string) => {
  return `${platform.toLowerCase()}-${contestCode}`;
};

// Process CodeChef API response data
const processCodeChefData = (data: any, bookmarkedIds: string[]): Contest[] => {
  const processedContests: Contest[] = [];
  
  // Process ongoing contests
  data.ongoing_contests.forEach((contest: any) => {
    const id = generateContestId('codechef', contest.contest_code);
    processedContests.push({
      id,
      platform: 'CodeChef',
      name: contest.contest_name,
      url: `https://www.codechef.com/${contest.contest_code}`,
      startTime: new Date(contest.contest_start_date).toISOString(),
      endTime: new Date(contest.contest_end_date).toISOString(),
      duration: (new Date(contest.contest_end_date).getTime() - new Date(contest.contest_start_date).getTime()) / 1000,
      status: ContestStatus.ONGOING,
      isBookmarked: bookmarkedIds.includes(id)
    });
  });
  
  // Process upcoming contests
  data.future_contests.forEach((contest: any) => {
    const id = generateContestId('codechef', contest.contest_code);
    processedContests.push({
      id,
      platform: 'CodeChef',
      name: contest.contest_name,
      url: `https://www.codechef.com/${contest.contest_code}`,
      startTime: new Date(contest.contest_start_date).toISOString(),
      endTime: new Date(contest.contest_end_date).toISOString(),
      duration: (new Date(contest.contest_end_date).getTime() - new Date(contest.contest_start_date).getTime()) / 1000,
      status: ContestStatus.UPCOMING,
      isBookmarked: bookmarkedIds.includes(id)
    });
  });
  
  // Process past contests
  data.past_contests.forEach((contest: any) => {
    const id = generateContestId('codechef', contest.contest_code);
    processedContests.push({
      id,
      platform: 'CodeChef',
      name: contest.contest_name,
      url: `https://www.codechef.com/${contest.contest_code}`,
      startTime: new Date(contest.contest_start_date).toISOString(),
      endTime: new Date(contest.contest_end_date).toISOString(),
      duration: (new Date(contest.contest_end_date).getTime() - new Date(contest.contest_start_date).getTime()) / 1000,
      status: ContestStatus.PAST,
      isBookmarked: bookmarkedIds.includes(id)
    });
  });
  
  return processedContests;
};

// Fetch contests from all platforms
export const fetchContests = async (): Promise<Contest[]> => {
  try {
    // Get bookmarked contests to check against
    const bookmarked = getBookmarkedContests();
    const bookmarkedIds = bookmarked.map(contest => contest.id);
    
    // Fetch contests from CodeChef API
    const response = await fetch('https://codechef-api.vercel.app/contests');
    
    if (!response.ok) {
      throw new Error('Failed to fetch contests');
    }
    
    const data = await response.json();
    
    // Process the CodeChef data
    const codeChefContests = processCodeChefData(data, bookmarkedIds);
    
    // In a real application, we would fetch contests from other platforms here
    // and combine them into a single array
    
    // For testing, you could also add mock data from the API
    // To get the combined contests
    return codeChefContests;
  } catch (error) {
    console.error("Error in fetchContests:", error);
    // Return empty array or throw the error based on your error handling strategy
    return [];
  }
};


/**
 * Filter contests based on platform, status, and search query
 */
export const filterContests = (
  contests: any, 
  platforms: string[], 
  status: string[], 
  searchQuery: string
) => {
  return Object.entries(contests).reduce((filtered: any, [platform, categoryContests]: [string, any]) => {
    // Skip this platform if it's not in the selected platforms (when platforms are selected)
    if (platforms.length > 0 && !platforms.map(p => p.toLowerCase()).includes(platform.toLowerCase())) {
      filtered[platform] = { upcoming: [], past: [] };
      return filtered;
    }

    const filteredByStatus = {
      upcoming: status.includes("PAST") ? [] : categoryContests.upcoming,
      past: status.includes("UPCOMING") ? [] : categoryContests.past
    };

    // Apply search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered[platform] = {
        upcoming: filteredByStatus.upcoming.filter((contest: any) => 
          contest.name?.toLowerCase().includes(query) || 
          contest.contestName?.toLowerCase().includes(query)),
        past: filteredByStatus.past.filter((contest: any) => 
          contest.name?.toLowerCase().includes(query) || 
          contest.contestName?.toLowerCase().includes(query))
      };
    } else {
      filtered[platform] = filteredByStatus;
    }

    return filtered;
  }, {
    codeforces: { upcoming: [], past: [] },
    leetcode: { upcoming: [], past: [] },
    codechef: { upcoming: [], past: [] }
  });
};

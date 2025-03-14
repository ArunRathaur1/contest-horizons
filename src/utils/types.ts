
export type Platform = 'Codeforces' | 'CodeChef' | 'LeetCode';

export enum ContestStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  PAST = 'past'
}

export interface Contest {
  id: string;
  name: string;
  platform: Platform;
  url: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  status: ContestStatus;
  duration: number; // in seconds
  isBookmarked?: boolean;
  solutionUrl?: string;
}

export interface FilterState {
  platforms: Platform[];
  status: ContestStatus[];
  searchQuery: string;
}


// Contest Types
export interface Contest {
  id: string;
  name: string;
  url: string;
  startTime: string;
  endTime: string;
  duration: string;
  platform: string;
  status: 'UPCOMING' | 'PAST';
  bookmarked?: boolean;
}

export interface ContestsState {
  codeforces: {
    upcoming: Contest[];
    past: Contest[];
  };
  leetcode: {
    upcoming: Contest[];
    past: Contest[];
  };
  codechef: {
    upcoming: Contest[];
    past: Contest[];
  };
}

// User Types
export interface User {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

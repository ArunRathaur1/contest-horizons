
# Contest Tracker Application Documentation

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Application Flow](#application-flow)
3. [Key Components](#key-components)
4. [File Structure](#file-structure)
5. [API Integration](#api-integration)
6. [Authentication](#authentication)
7. [Bookmarking System](#bookmarking-system)
8. [YouTube Links Integration](#youtube-links-integration)

## Tech Stack

This application is built using the following technologies:

- **Frontend Framework**: React (with TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Component Library**: shadcn/ui (based on Radix UI)
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Native fetch API
- **Date Handling**: Date manipulation utilities
- **Cookie Management**: js-cookie

## Application Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  User Interface │     │  React Components│     │  Backend APIs   │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  User Actions   │────▶│  State Updates  │────▶│  API Requests   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  UI Updates     │◀────│  State Changes  │◀────│  API Responses  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Key Components

1. **App.tsx**: The main entry point that sets up routing and maintains global state.

2. **Index.jsx**: The contests page that fetches and displays programming contests from different platforms.

3. **ContestList.tsx**: Renders a list of contests with platform-specific components.

4. **FilterBar.tsx**: Allows users to filter contests by platform, status, and search query.

5. **BookmarkedContests.tsx**: Displays contests that users have bookmarked.

6. **Login.tsx & Signup.tsx**: Authentication pages.

7. **AddYoutube.jsx**: Admin interface to add YouTube links to contests.

## File Structure

- `src/`
  - `components/`: UI components
    - `ui/`: shadcn/ui components
    - Platform-specific components (CodeForcesCard, LeetcodeUpcoming, etc.)
  - `pages/`: Route components
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions and types
  - `services/`: API service functions

## API Integration

The application integrates with backend APIs to fetch contest data from three programming platforms:

1. **CodeForces**
2. **LeetCode**
3. **CodeChef**

API endpoints are defined in the `API_URLS` object in the Index component:

```javascript
const API_URLS = {
  codeforces: "http://localhost:5000/api/contest/codeforces",
  leetcode: "http://localhost:5000/api/contest/leetcode",
  codechef: "http://localhost:5000/api/contest/codechef",
};
```

## Authentication

The application uses token-based authentication:

1. Users register or login through the Signup/Login pages
2. On successful authentication, a token is stored in localStorage
3. The token is used in API requests that require authentication (e.g., bookmarking contests)

## Bookmarking System

Users can bookmark contests they are interested in:

1. The bookmark action requires authentication
2. Bookmarked contests are stored on the server via the API
3. Bookmarks are also cached locally in localStorage
4. The BookmarkedContests page displays all bookmarked contests

## YouTube Links Integration

The application supports adding YouTube links to contests (likely tutorial videos or editorial discussions):

1. Admin users can access the AddYoutube page (protected route)
2. YouTube links can be added to specific contests
3. When contests are displayed, their YouTube links (if available) are shown alongside other information

## Data Flow

1. **Data Fetching**:
   - Contest data is fetched from backend APIs
   - YouTube links are fetched separately and merged with contest data
   - Data is cached in localStorage for performance

2. **State Management**:
   - Contest data is stored in component state
   - Filters are applied to the data before rendering
   - Bookmarks are synchronized between server and local storage

3. **Rendering**:
   - Platform-specific components render contest data
   - Loading states handle asynchronous operations
   - Error handling provides feedback on API failures

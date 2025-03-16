
import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Calendar, Clock, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BookmarkedContests = ({ token }) => {
  const [bookmarkedContests, setBookmarkedContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedContests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/fetchuser",
          {
            method: "POST",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Fetched User Data:", data);

          const validContests = (data.bookmark || []).filter(
            (contest) => contest && (contest.name || contest.contestName)
          );

          setBookmarkedContests(validContests);
        } else {
          console.error(
            "Failed to fetch bookmarks:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching bookmarked contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedContests();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppNavbar />
        <div className="container mx-auto p-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <Bookmark className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold">Your Bookmarked Contests</h1>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-48 bg-muted/50"></Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex items-center justify-center mb-8">
          <Bookmark className="w-8 h-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold">Your Bookmarked Contests</h1>
        </div>
        
        {bookmarkedContests.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-4 inline-flex">
              <Bookmark className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No bookmarked contests yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You haven't bookmarked any contests. Go to the contests page to explore and bookmark contests you're interested in.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookmarkedContests.map((contest, index) => {
              const contestName =
                contest.name || contest.contestName || "Unnamed Contest";
              const contestLink = contest.link || contest.contestLink;
              const startTime =
                contest.formattedStartTime ||
                contest.time ||
                contest.timeInfo ||
                "Unknown";
              const duration = contest.formattedDuration || "N/A";
              const startsIn = contest.daysUntil
                ? `${contest.daysUntil} days`
                : contest.startsIn || "N/A";
              const platform = contest.platform || "Coding Platform";

              return (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in card-hover"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-lg font-bold line-clamp-2 flex-1">
                        {contestName}
                      </h2>
                      <Badge variant="outline" className="ml-2 shrink-0">
                        {platform}
                      </Badge>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {startTime}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Duration: {duration}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Badge variant="secondary">{startsIn}</Badge>
                        {contestLink && (
                          <a
                            href={contestLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary hover:underline text-sm"
                          >
                            Contest Link
                            <ExternalLink className="ml-1 w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedContests;

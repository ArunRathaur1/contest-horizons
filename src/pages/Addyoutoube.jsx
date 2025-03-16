
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Youtube, Search, Link as LinkIcon } from "lucide-react";

export default function AddYoutube() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContest, setSelectedContest] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  
  useEffect(() => {
    const loadContestsFromStorage = () => {
      try {
        const saved = localStorage.getItem("contestData");
        return saved ? JSON.parse(saved) : null;
      } catch (err) {
        console.error("Error loading contests from storage:", err);
        return null;
      }
    };
    
    const storedData = loadContestsFromStorage();
    setData(storedData);
  }, []);
  
  const handleSelectContest = (contest) => {
    setSelectedContest(contest);
    setSearchTerm(contest.name || ""); // Add fallback in case name is undefined
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedContest || !youtubeLink) {
      alert("Please select a contest and enter a YouTube link.");
      return;
    }
    console.log("Selected Contest:", selectedContest);
    console.log("YouTube Link:", youtubeLink);
  };
  
  // Corrected search logic with null checks
  const getAllContests = () => {
    let contests = [];
    
    if (data) {
      // Iterate through each platform (codeforces, leetcode, codechef)
      Object.keys(data).forEach((platform) => {
        const platformData = data[platform];
        
        // For each platform, search both past and upcoming contests
        if (Array.isArray(platformData.past)) {
          contests = [...contests, ...platformData.past];
        }
        
        if (Array.isArray(platformData.upcoming)) {
          contests = [...contests, ...platformData.upcoming];
        }
      });
    }
    // Filter out any items that don't have a name property
    return contests.filter(contest => contest && typeof contest === 'object' && contest.name);
  };
  
  const filteredContests = 
    searchTerm
      ? getAllContests().filter((contest) => 
          contest.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-4xl">
      <Card className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 border-0 shadow-lg">
        <CardHeader className="pb-4 space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
              <Youtube className="h-6 w-6 text-red-600" />
              Add YouTube Solution
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Share your video solutions for coding contests with the community
          </CardDescription>
          <Separator className="my-1" />
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="search-contest" className="text-sm font-medium">
                Search Contest
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-contest"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type contest name to search..."
                  className="pl-9 bg-white/80 dark:bg-black/20 border border-indigo-100 dark:border-indigo-900/50"
                />
              </div>
              
              {searchTerm && filteredContests.length > 0 ? (
                <div className="mt-2 bg-white dark:bg-black/40 rounded-md border border-indigo-100 dark:border-indigo-900/50 shadow-md max-h-48 overflow-y-auto">
                  <ul className="py-1">
                    {filteredContests.map((contest, index) => (
                      <li 
                        key={contest.id || index} 
                        onClick={() => handleSelectContest(contest)}
                        className="px-3 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer text-sm transition-colors"
                      >
                        <div className="font-medium">{contest.name}</div>
                        {contest.platform && (
                          <div className="text-xs text-muted-foreground">
                            Platform: {contest.platform}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : searchTerm ? (
                <div className="mt-2 text-sm text-muted-foreground">No contests found with that name</div>
              ) : null}
            </div>
            
            {selectedContest && (
              <div className="p-3 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-md border border-indigo-200 dark:border-indigo-800">
                <div className="text-sm font-medium">Selected Contest:</div>
                <div className="text-lg font-semibold">{selectedContest.name}</div>
                {selectedContest.platform && (
                  <div className="text-xs text-muted-foreground">
                    Platform: {selectedContest.platform}
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="youtube-link" className="text-sm font-medium flex items-center gap-2">
                YouTube Link
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-help text-muted-foreground text-xs">(What format?)</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Accepted formats:</h4>
                      <ul className="text-xs space-y-1">
                        <li>• Full URL: https://www.youtube.com/watch?v=VIDEOID</li>
                        <li>• Short URL: https://youtu.be/VIDEOID</li>
                      </ul>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="youtube-link"
                  type="text"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="pl-9 bg-white/80 dark:bg-black/20 border border-indigo-100 dark:border-indigo-900/50"
                  required
                />
              </div>
            </div>
          
            <CardFooter className="px-0 pt-2 pb-0 flex justify-end">
              <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto"
              >
                <Youtube className="mr-2 h-4 w-4" />
                Submit Solution
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

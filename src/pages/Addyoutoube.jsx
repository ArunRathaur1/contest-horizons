import React, { useEffect, useState } from "react";

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
    <div className="container">
      <h2>Add YouTube Link</h2>
      <form onSubmit={handleSubmit}>
        {/* Searchable Contest Selection */}
        <label>Search Contest:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search contest..."
        />
        {searchTerm && filteredContests.length > 0 && (
          <ul className="dropdown-list">
            {filteredContests.map((contest, index) => (
              <li 
                key={contest.id || index} 
                onClick={() => handleSelectContest(contest)}
                className="dropdown-item"
              >
                {contest.name}
              </li>
            ))}
          </ul>
        )}
        
        {/* Input for YouTube Link */}
        <label>YouTube Link:</label>
        <input
          type="text"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="Enter YouTube Link..."
          required
        />
        
        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
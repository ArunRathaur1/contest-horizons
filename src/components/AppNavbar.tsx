
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppNavbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-background border-b py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">Contest Tracker</Link>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            asChild 
            variant={location.pathname === "/contests" ? "default" : "ghost"}
          >
            <Link to="/contests">Contests</Link>
          </Button>
          
          <Button 
            asChild 
            variant={location.pathname === "/bookmarks" ? "default" : "ghost"}
          >
            <Link to="/bookmarks">Bookmarks</Link>
          </Button>
          
          {location.pathname !== "/login" && location.pathname !== "/signup" && (
            <Button asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;


import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppNavbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-background border-b py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary">Contest Tracker</Link>
        </div>
        
        <div className="flex space-x-2">
          {location.pathname !== "/" && (
            <>
              <Button 
                asChild 
                variant={location.pathname === "/contests" ? "default" : "ghost"}
                size="sm"
              >
                <Link to="/contests">Contests</Link>
              </Button>
              
              <Button 
                asChild 
                variant={location.pathname === "/bookmarks" ? "default" : "ghost"}
                size="sm"
              >
                <Link to="/bookmarks">Bookmarks</Link>
              </Button>
            </>
          )}
          
          {location.pathname !== "/login" && (
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
          
          {location.pathname !== "/signup" && (
            <Button asChild variant="default" size="sm">
              <Link to="/signup">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;

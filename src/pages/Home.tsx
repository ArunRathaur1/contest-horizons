
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Contest Tracker
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Track competitive programming contests from Codeforces, LeetCode, and CodeChef
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-3">
            <Button asChild className="w-full">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link to="/">Continue as Guest</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

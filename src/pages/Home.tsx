
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppNavbar from "@/components/AppNavbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Track <span className="text-primary">Competitive Programming</span> Contests
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with all programming contests from Codeforces, LeetCode, and CodeChef in one place.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button asChild size="lg" className="px-8">
              <Link to="/contests">Browse Contests</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { title: "Codeforces", description: "Regular competitive programming contests" },
              { title: "LeetCode", description: "Weekly contests and biweekly contests" },
              { title: "CodeChef", description: "Long challenges and cook-offs" }
            ].map((platform, index) => (
              <Card key={index} className="text-center card-hover">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{platform.title}</h3>
                  <p className="text-muted-foreground">{platform.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>Contest Tracker - Your Programming Contest Companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

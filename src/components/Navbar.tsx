
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookmarkIcon, Code2Icon, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2Icon className="h-8 w-8 text-primary" />
              <span className="font-semibold text-xl tracking-tight">Contest Horizons</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </div>
            </Link>
            
            <Link 
              to="/bookmarks" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                location.pathname === '/bookmarks' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-1">
                <BookmarkIcon className="h-4 w-4" />
                <span>Bookmarks</span>
              </div>
            </Link>
            <Link to='/'>
                <span>Logout</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

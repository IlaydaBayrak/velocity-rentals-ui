
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm animate-fade-in">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <Car className="w-6 h-6 text-rentacar-blue" />
          <span className="text-xl font-bold text-rentacar-dark-blue font-montserrat">Rent A Car</span>
        </Link>

        <nav className="hidden space-x-6 md:flex">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-rentacar-blue">
            Home
          </Link>
          {user?.isAdmin && (
            <Link to="/admin" className="text-sm font-medium transition-colors hover:text-rentacar-blue">
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Hello, {user?.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/login")} variant="default" size="sm">
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

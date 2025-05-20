
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (isAdmin?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (isAdmin: boolean = false) => {
    // Mock login - in a real app, this would involve authentication
    const newUser: User = {
      id: isAdmin ? "admin-1" : "user-1",
      name: isAdmin ? "Admin User" : "Regular User",
      email: isAdmin ? "admin@rentacar.com" : "user@example.com",
      isAdmin
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${newUser.name}!`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

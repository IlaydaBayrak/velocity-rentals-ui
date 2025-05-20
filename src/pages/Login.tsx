
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Car } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (isAdmin: boolean = false) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      login(isAdmin);
      navigate(isAdmin ? "/admin" : "/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=3283&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <Card className="w-[350px] z-10 shadow-xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Car className="w-10 h-10 p-2 text-white rounded-full bg-rentacar-blue" />
          </div>
          <CardTitle className="text-2xl">Welcome to Rent A Car</CardTitle>
          <CardDescription>Login to continue to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={() => handleLogin(false)}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login as User"}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleLogin(true)}
            disabled={isLoading}
          >
            Login as Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

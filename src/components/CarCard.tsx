
import React, { useState } from "react";
import { Car as CarType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Star } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface CarCardProps {
  car: CarType;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleRentNow = () => {
    toast({
      title: "Car Reserved!",
      description: `You've reserved the ${car.brand} ${car.model}. Check your email for details.`,
    });
  };

  return (
    <Card 
      className="overflow-hidden shine-effect card-hover-effect fade-slide-in"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-48 overflow-hidden group">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className={`object-cover w-full h-full transition-all duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}
        />
        {car.available && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-xs font-semibold text-white rounded-full bg-rentacar-blue animate-pulse">
              Available
            </span>
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : ''}`}></div>
      </div>
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <h3 className="text-lg font-bold cursor-pointer">{car.brand} {car.model}</h3>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 glass-effect">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Vehicle Specifications</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <span>Year: {car.year}</span>
                  <span>Fuel: Petrol</span>
                  <span>Seats: 5</span>
                  <span>Transmission: Auto</span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-rentacar-blue flex items-center gap-1">
            <Star className="w-3 h-3" />
            ${car.price}/day
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Year: {car.year}</span>
          <span className="font-medium text-rentacar-orange">
            {car.available ? "Available Now" : "Reserved"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className={`w-full gap-2 transition-all duration-300 ${isHovering ? 'bg-rentacar-blue' : ''}`} 
          onClick={handleRentNow}
          disabled={!car.available}
        >
          Rent Now
          <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;

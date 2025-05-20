
import React from "react";
import { Car as CarType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

interface CarCardProps {
  car: CarType;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { toast } = useToast();
  
  const handleRentNow = () => {
    toast({
      title: "Car Reserved!",
      description: `You've reserved the ${car.brand} ${car.model}. Check your email for details.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 car-card-shadow hover-scale">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
          <span className="px-2 py-1 text-xs text-white rounded-full bg-rentacar-blue">
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
          className="w-full gap-2" 
          onClick={handleRentNow}
          disabled={!car.available}
        >
          Rent Now
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;

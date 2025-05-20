
import React, { useState } from "react";
import { Car as CarType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Star } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className="overflow-hidden card-hover-effect"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative h-48 overflow-hidden group perspective-effect">
          <motion.img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="object-cover w-full h-full"
            animate={{ 
              scale: isHovering ? 1.1 : 1,
              rotateY: isHovering ? 5 : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          {car.available && (
            <div className="absolute top-2 right-2">
              <motion.span 
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-2 py-1 text-xs font-semibold text-white rounded-full bg-rentacar-blue"
              >
                Available
              </motion.span>
            </div>
          )}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {isHovering && (
            <motion.div 
              className="absolute bottom-2 left-2 right-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button 
                variant="secondary" 
                className="w-full gap-2 text-white bg-white/20 backdrop-blur-sm hover:bg-white/40" 
                onClick={() => {}}
              >
                View Details
              </Button>
            </motion.div>
          )}
        </div>
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <motion.h3 
                  className="text-lg font-bold cursor-pointer"
                  animate={{ color: isHovering ? "#0F2942" : "#1A1F2C" }}
                  transition={{ duration: 0.3 }}
                >
                  {car.brand} {car.model}
                </motion.h3>
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
            <motion.span 
              className="px-2 py-1 text-xs font-medium text-white rounded-full bg-rentacar-blue flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-3 h-3" />
              ${car.price}/day
            </motion.span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Year: {car.year}</span>
            <motion.span 
              className={`font-medium ${car.available ? "text-rentacar-blue" : "text-gray-500"}`}
              animate={{ 
                scale: car.available && isHovering ? [1, 1.05, 1] : 1
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {car.available ? "Available Now" : "Reserved"}
            </motion.span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full gap-2 transition-all duration-300" 
            onClick={handleRentNow}
            disabled={!car.available}
            style={{
              background: isHovering ? "#0F2942" : "",
              transform: isHovering ? "translateY(-2px)" : "translateY(0)"
            }}
          >
            Rent Now
            <motion.div
              animate={{ x: isHovering ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CarCard;


import React, { useState } from "react";
import { Car as CarType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Star } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion, AnimatePresence } from "framer-motion";

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
        y: -12,
        rotateY: 5,
        transition: { duration: 0.4 }
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="dramatic-entrance"
    >
      <Card 
        className="overflow-hidden card-hover-effect shine-effect"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative h-48 overflow-hidden group perspective-effect road-animation">
          <motion.img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="object-cover w-full h-full"
            animate={{ 
              scale: isHovering ? 1.12 : 1,
              y: isHovering ? -5 : 0,
              rotateY: isHovering ? 3 : 0
            }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut"
            }}
          />
          {car.available && (
            <motion.div 
              className="absolute top-2 right-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span 
                animate={{ 
                  scale: [1, 1.1, 1],
                  backgroundColor: ["#1A365D", "#2A4A7B", "#1A365D"]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="px-2 py-1 text-xs font-semibold text-white rounded-full bg-rentacar-blue"
              >
                Available
              </motion.span>
            </motion.div>
          )}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <AnimatePresence>
            {isHovering && (
              <motion.div 
                className="absolute bottom-2 left-2 right-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }}
              >
                <Button 
                  variant="secondary" 
                  className="w-full gap-2 text-white bg-white/20 backdrop-blur-sm hover:bg-white/40" 
                  onClick={() => {}}
                >
                  <motion.span
                    animate={{ x: [-2, 0, -2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    View Details
                  </motion.span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <motion.h3 
                  className="text-lg font-bold cursor-pointer"
                  animate={{ 
                    color: isHovering ? "#0F2942" : "#1A1F2C",
                    textShadow: isHovering ? "0 0 1px rgba(15, 41, 66, 0.3)" : "none"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {car.brand} {car.model}
                </motion.h3>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 glass-effect rotate-in">
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
              className="px-2 py-1 text-xs font-medium text-white rounded-full bg-rentacar-blue flex items-center gap-1 floating"
              whileHover={{ scale: 1.1, rotate: [0, -1, 1, -1, 0] }}
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
                scale: car.available && isHovering ? [1, 1.08, 1] : 1,
                textShadow: car.available && isHovering ? "0 0 5px rgba(26, 54, 93, 0.5)" : "none"
              }}
              transition={{ duration: 1.2, repeat: Infinity }}
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
              transform: isHovering ? "translateY(-3px)" : "translateY(0)",
              boxShadow: isHovering ? "0 10px 15px -3px rgba(0, 0, 0, 0.2)" : ""
            }}
          >
            <motion.span
              animate={isHovering ? { y: [0, -2, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Rent Now
            </motion.span>
            <motion.div
              animate={isHovering ? { 
                x: [0, 5, 0],
                transition: { duration: 1.2, repeat: Infinity } 
              } : {}}
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

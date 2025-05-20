
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const carouselItems = [
  {
    id: 1,
    title: "Premium Rental Experience",
    description: "Choose from our wide range of luxury vehicles for your journey",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000",
    color: "bg-rentacar-blue",
  },
  {
    id: 2,
    title: "Affordable Daily Rates",
    description: "Get the best prices for quality car rentals",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1000",
    color: "bg-rentacar-orange",
  },
  {
    id: 3,
    title: "Easy Online Booking",
    description: "Reserve your vehicle in minutes with our simple process",
    image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1000",
    color: "bg-rentacar-dark-blue",
  },
];

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// New car animation variants
const carAnimationVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 }
    }
  })
};

const CarouselBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full py-8">
      <div className="w-full max-w-5xl mx-auto relative overflow-hidden">
        <div className="relative h-[400px] w-full rounded-xl">
          {carouselItems.map((item, index) => (
            <motion.div
              key={item.id}
              custom={direction}
              variants={carAnimationVariants}
              initial="enter"
              animate={index === currentIndex ? "center" : ""}
              exit="exit"
              className={`absolute top-0 left-0 w-full h-full ${index === currentIndex ? 'block' : 'hidden'}`}
              style={{ zIndex: index === currentIndex ? 1 : 0 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-end p-8">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    className="space-y-4 max-w-md"
                  >
                    <motion.div variants={itemVariants}>
                      <Badge className={`px-3 py-1 text-white ${item.color}`}>
                        Featured
                      </Badge>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white">
                      {item.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-white/80">
                      {item.description}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10">
            <div className="flex gap-2">
              <button 
                onClick={handlePrevious}
                className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-rentacar-blue scale-125" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselBanner;

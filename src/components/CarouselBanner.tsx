
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

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

const CarouselBanner: React.FC = () => {
  return (
    <div className="w-full py-8">
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {carouselItems.map((item) => (
            <CarouselItem key={item.id} className="md:basis-full lg:basis-full">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-end p-8">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    className="space-y-4 max-w-md"
                  >
                    <motion.div variants={itemVariants}>
                      <span className={`px-3 py-1 text-sm text-white rounded-full ${item.color}`}>
                        Featured
                      </span>
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-8 w-8" />
            <CarouselNext className="relative right-0 top-0 translate-y-0 h-8 w-8" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselBanner;

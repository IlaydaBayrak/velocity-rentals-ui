
import React, { useState, useEffect } from "react";
import { cars as carsData } from "@/data/cars";
import CarCard from "@/components/CarCard";
import CarFilters from "@/components/CarFilters";
import CarouselBanner from "@/components/CarouselBanner";
import { Car as CarType } from "@/types";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarType[]>(carsData);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    let filtered = [...carsData];

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((car) => selectedBrands.includes(car.brand));
      setActiveFilter(true);
    }

    // Filter by price range
    filtered = filtered.filter(
      (car) => car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    // Filter by year
    if (selectedYears.length > 0) {
      filtered = filtered.filter((car) => selectedYears.includes(car.year));
      setActiveFilter(true);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setActiveFilter(true);
    }

    if (
      selectedBrands.length === 0 &&
      selectedYears.length === 0 &&
      !searchQuery &&
      priceRange[0] === 0 &&
      priceRange[1] === 500
    ) {
      setActiveFilter(false);
    }

    setCars(filtered);
  }, [selectedBrands, priceRange, selectedYears, searchQuery]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container py-8 mx-auto">
      <CarouselBanner />
      
      <div className="mt-10 mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-rentacar-dark-blue mb-2"
        >
          Available Vehicles
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-24 h-1 bg-rentacar-blue mx-auto"
        ></motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/4"
        >
          <CarFilters
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedYears={selectedYears}
            setSelectedYears={setSelectedYears}
          />
        </motion.div>

        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a car..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rentacar-blue"
              />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute right-3 top-3 text-sm text-gray-400"
              >
                {cars.length} {cars.length === 1 ? "vehicle" : "vehicles"} found
              </motion.span>
            </div>
          </div>

          {activeFilter && cars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center bg-white rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-medium text-gray-600">No cars match your filters</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
            </motion.div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {cars.map((car) => (
                <motion.div key={car.id} variants={item}>
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

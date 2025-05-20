
import React, { useState } from "react";
import CarCard from "@/components/CarCard";
import CarFilters from "@/components/CarFilters";
import { cars } from "@/data/cars";
import { Car } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

const Home: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = cars.filter((car: Car) => {
    // Filter by brand if any brand is selected
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
    
    // Filter by year if any year is selected
    const yearMatch = selectedYears.length === 0 || selectedYears.includes(car.year);
    
    // Filter by price range
    const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1];
    
    // Filter by search query
    const searchMatch = 
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
      car.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    return brandMatch && yearMatch && priceMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="px-4 py-8 bg-rentacar-blue">
        <div className="container">
          <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">Find Your Perfect Ride</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by brand or model..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:col-span-1`}>
            <div className="sticky top-20">
              <CarFilters
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedYears={selectedYears}
                setSelectedYears={setSelectedYears}
              />
            </div>
          </div>
          
          <div className="md:col-span-3">
            {filteredCars.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-lg shadow">
                <h3 className="mb-2 text-lg font-semibold">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters to find more options.</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Available Cars ({filteredCars.length})</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

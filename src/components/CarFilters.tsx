
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cars } from "@/data/cars";

interface CarFiltersProps {
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  selectedYears: number[];
  setSelectedYears: React.Dispatch<React.SetStateAction<number[]>>;
}

const CarFilters: React.FC<CarFiltersProps> = ({
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  selectedYears,
  setSelectedYears,
}) => {
  // Get unique brands from cars data
  const brands = Array.from(new Set(cars.map((car) => car.brand)));
  
  // Get unique years from cars data
  const years = Array.from(new Set(cars.map((car) => car.year))).sort((a, b) => b - a);
  
  // Get min and max price from cars data
  const minPrice = Math.min(...cars.map((car) => car.price));
  const maxPrice = Math.max(...cars.map((car) => car.price));

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleYearChange = (year: number) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter((y) => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Filters</h3>
      
      <Accordion type="single" collapsible defaultValue="brands" className="mb-4">
        <AccordionItem value="brands">
          <AccordionTrigger className="py-2">Car Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion type="single" collapsible defaultValue="price" className="mb-4">
        <AccordionItem value="price">
          <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[minPrice, maxPrice]}
                min={minPrice}
                max={maxPrice}
                step={5}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="mb-2"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">${priceRange[0]}</span>
                <span className="text-sm text-gray-500">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="year">
          <AccordionTrigger className="py-2">Year</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {years.map((year) => (
                <div key={year} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`year-${year}`}
                    checked={selectedYears.includes(year)}
                    onCheckedChange={() => handleYearChange(year)}
                  />
                  <label
                    htmlFor={`year-${year}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {year}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CarFilters;

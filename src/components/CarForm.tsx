import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Car } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface CarFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (car: Omit<Car, "id" | "available">) => void;
  editCar?: Car;
}

const CarForm: React.FC<CarFormProps> = ({ isOpen, onClose, onSubmit, editCar }) => {
  const [brand, setBrand] = useState(editCar?.brand || "");
  const [model, setModel] = useState(editCar?.model || "");
  const [year, setYear] = useState(editCar?.year || new Date().getFullYear());
  const [price, setPrice] = useState(editCar?.price || 0);
  const [image, setImage] = useState(editCar?.image || "");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!brand || !model || !year || !price || !image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit({ brand, model, year, price, image });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setBrand("");
    setModel("");
    setYear(new Date().getFullYear());
    setPrice(0);
    setImage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editCar ? "Edit Car" : "Add New Car"}</DialogTitle>
          <DialogDescription>
            {editCar
              ? "Update the car details below. Click save when you're done."
              : "Add a new car to your inventory. Fill in all the required fields."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="model" className="text-right">
                Model
              </Label>
              <Input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                id="year"
                type="number"
                min={1900}
                max={new Date().getFullYear() + 1}
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="price" className="text-right">
                Price/Day ($)
              </Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={1}
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/car.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editCar ? "Update Car" : "Add Car"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CarForm;

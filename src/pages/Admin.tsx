import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Car } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import CarForm from "@/components/CarForm";

const Admin = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState<Car | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const { toast } = useToast();

  // ✅ Backend'den arabaları çek
  useEffect(() => {
    const fetchCars = async () => {
      try {
       const response = await api.get<Car[]>("/cars");

        setCars(response.data);
      } catch (error) {
        toast({ title: "Error", description: "Failed to load cars from backend." });
      }
    };

    fetchCars();
  }, []);

  // ✅ Admin yetkisi yoksa yönlendir
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const filteredCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Yeni araç ekle
  const handleAddCar = async (newCar: Omit<Car, "id" | "image" | "available">) => {
    try {
      const response = await api.post<Car>("/cars", {

        ...newCar,
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2670&auto=format&fit=crop",
        available: true,
      });

      setCars(prev => [...prev, response.data]);
      toast({ title: "Car Added", description: `${response.data.brand} added.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add car." });
    }
  };

  // ✅ Araç güncelle
  const handleEditCar = async (updatedCar: Omit<Car, "id" | "image" | "available">) => {
    if (!currentCar) return;

    try {
      const response = await api.put<Car>(`/cars/${currentCar.id}`, {

        ...updatedCar,
        image: currentCar.image,
        available: currentCar.available,
      });

      setCars(prev => prev.map(car => car.id === currentCar.id ? response.data : car));
      toast({ title: "Car Updated", description: `${response.data.brand} updated.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update car." });
    }
  };

  // ✅ Araç sil
  const handleDelete = async () => {
    if (!carToDelete) return;

    try {
      await api.delete(`/cars/${carToDelete.id}`);
      setCars(prev => prev.filter(car => car.id !== carToDelete.id));
      toast({ title: "Car Deleted", description: `${carToDelete.brand} deleted.` });
      setDeleteDialogOpen(false);
      setCarToDelete(null);
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete car." });
    }
  };

  const openEditForm = (car: Car) => {
    setCurrentCar(car);
    setIsFormOpen(true);
  };

  const confirmDelete = (car: Car) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="px-4 py-8 bg-rentacar-dark-blue">
        <div className="container">
          <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">Admin Dashboard</h1>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center">
            <h2 className="text-xl font-semibold">Car Inventory</h2>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cars..."
                  className="pl-10 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => { setCurrentCar(undefined); setIsFormOpen(true); }} className="gap-2">
                <Plus className="w-4 h-4" />
                Add New Car
              </Button>
            </div>
          </div>
          
          <div className="overflow-hidden border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price/Day</TableHead>
                  <TableHead>Status</TableHead>
                   <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No cars found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell className="font-medium">{car.id}</TableCell>
                      <TableCell>{car.brand}</TableCell>
                      <TableCell>{car.model}</TableCell>
                      <TableCell>{car.year}</TableCell>
                      <TableCell>${car.price}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${car.available ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {car.available ? 'Available' : 'Reserved'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openEditForm(car)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => confirmDelete(car)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      <CarForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={currentCar ? handleEditCar : handleAddCar}
        editCar={currentCar}
      />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              {carToDelete && ` ${carToDelete.brand} ${carToDelete.model}`} from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;

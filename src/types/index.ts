
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  available: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

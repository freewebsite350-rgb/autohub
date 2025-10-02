export interface Dealer {
  id: string;
  name: string;
  phone: string;
  email: string;
  brandImageUrl: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  description: string;
  imageUrl: string;
  dealerId: string;
}
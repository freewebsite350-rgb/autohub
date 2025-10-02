import CarCard from '@/components/CarCard';

type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image_url: string;
}

const cars: Car[] = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2024,
    price: 25000,
    image_url: "/cars/toyota-corolla.jpg"
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2024,
    price: 26000,
    image_url: "/cars/honda-civic.jpg"
  },
  {
    id: 3,
    make: "BMW",
    model: "X5",
    year: 2024,
    price: 65000,
    image_url: "/cars/bmw-x5.jpg"
  }
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Car Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </main>
  );
}
import CarCard from '../components/CarCard';

const cars = [
  { id: 1, make: 'Toyota', model: 'Corolla', image: '/cars/toyota-corolla.jpg' },
  { id: 2, make: 'Honda', model: 'Civic', image: '/cars/honda-civic.jpg' },
  { id: 3, make: 'BMW', model: 'X5', image: '/cars/bmw-x5.jpg' },
];

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Car Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
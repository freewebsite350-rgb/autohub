import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';
import Link from 'next/link';

const HomePage = () => {
  const featuredCars = cars.slice(0, 4); // Show the first 4 cars as featured

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to CarMart</h1>
        <p className="text-xl text-gray-600 mt-2">Your one-stop shop for the best cars</p>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8">Featured Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/cars" className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Browse All Cars
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
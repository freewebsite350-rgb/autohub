import Link from 'next/link';
import { Car } from '@/lib/types';
import { dealers } from '@/data/dealers';

const CarCard = ({ car }: { car: Car }) => {
  const dealer = dealers.find((d) => d.id === car.dealerId);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <Link href={`/cars/${car.id}`}>
        <div>
          <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800">{car.make} {car.model}</h3>
            <p className="text-gray-600">{car.year} &bull; {car.mileage.toLocaleString()} miles</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">${car.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Sold by: {dealer?.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
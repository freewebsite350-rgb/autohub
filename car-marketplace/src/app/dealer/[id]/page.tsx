import { dealers } from '@/data/dealers';
import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';
import Link from 'next/link';

const DealerPage = ({ params }: { params: { id: string } }) => {
  const dealer = dealers.find((d) => d.id === params.id);
  const dealerCars = cars.filter((car) => car.dealerId === params.id);

  if (!dealer) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Dealer not found</h1>
        <Link href="/cars" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <img src={dealer.brandImageUrl} alt={dealer.name} className="w-24 h-24 rounded-full mr-6" />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{dealer.name}</h1>
          <p className="text-lg text-gray-600">{dealer.email}</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8">Our Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {dealerCars.length > 0 ? (
          dealerCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <p>This dealer has no cars for sale at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default DealerPage;
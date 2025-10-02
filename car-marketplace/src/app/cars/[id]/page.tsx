import { cars } from '@/data/cars';
import { dealers } from '@/data/dealers';
import { Car } from '@/lib/types';
import Link from 'next/link';

const CarDetailPage = ({ params }: { params: { id: string } }) => {
  const car = cars.find((c) => c.id === params.id);

  if (!car) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Car not found</h1>
        <Link href="/cars" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Browse
        </Link>
      </div>
    );
  }

  const dealer = dealers.find((d) => d.id === car.dealerId);
  const whatsappLink = `https://wa.me/${dealer?.phone}?text=Hi, I'm interested in the ${car.make} ${car.model} you have for sale.`;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{car.make} {car.model}</h1>
          <p className="text-xl text-gray-600 mt-2">{car.year}</p>
          <p className="text-3xl font-bold text-gray-900 mt-4">${car.price.toLocaleString()}</p>
          <p className="text-gray-600 mt-2">{car.mileage.toLocaleString()} miles</p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
            <p className="text-gray-700 mt-2">{car.description}</p>
          </div>

          {dealer && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">Dealer Information</h2>
              <div className="flex items-center mt-2">
                <img src={dealer.brandImageUrl} alt={dealer.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <p className="text-xl font-bold text-gray-800">{dealer.name}</p>
                  <p className="text-gray-600">{dealer.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 inline-flex items-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.803 6.283l-1.222 4.464 4.639-1.225z"/></svg>
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
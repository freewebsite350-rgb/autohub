"use client";

import { useState, useEffect } from 'react';
import { Car, Dealer } from '@/lib/types';
import { getCars, deleteCar, getDealerById } from '@/lib/api';
import Link from 'next/link';

// Assume a logged-in dealer for now
const LOGGED_IN_DEALER_ID = '1';

const DealerCarCard = ({ car, onDelete }: { car: Car; onDelete: (id: string) => void }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-24 h-16 object-cover rounded-md mr-4" />
        <div>
          <h3 className="text-lg font-bold text-gray-800">{car.make} {car.model}</h3>
          <p className="text-gray-600">{car.year} &bull; ${car.price.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Link href={`/dealer/edit/${car.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Edit
        </Link>
        <button
          onClick={() => onDelete(car.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const DealerDashboardPage = () => {
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [dealerCars, setDealerCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dealerData, allCars] = await Promise.all([
          getDealerById(LOGGED_IN_DEALER_ID),
          getCars()
        ]);
        if (dealerData) {
          setDealer(dealerData);
          setDealerCars(allCars.filter(car => car.dealerId === LOGGED_IN_DEALER_ID));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        setDealerCars(dealerCars.filter((car) => car.id !== id));
        alert('Car deleted successfully!');
      } catch (error) {
        console.error("Failed to delete car:", error);
        alert('Failed to delete car.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dealer) {
    return <h1 className="text-2xl font-bold">Dealer not found</h1>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {dealer.name}</h1>
        <Link href="/dealer/add" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
          Add New Car
        </Link>
      </div>
      <div className="space-y-4">
        {dealerCars.length > 0 ? (
          dealerCars.map((car) => (
            <DealerCarCard key={car.id} car={car} onDelete={handleDelete} />
          ))
        ) : (
          <p>You have no cars listed. Add one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default DealerDashboardPage;
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCarById, updateCar } from '@/lib/api';
import { Car } from '@/lib/types';

const EditCarPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(params.id);
        if (carData) {
          setCar(carData);
        }
      } catch (error) {
        console.error("Failed to fetch car:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (car) {
      const { name, value } = e.target;
      setCar({ ...car, [name]: name === 'year' || name === 'mileage' || name === 'price' ? parseInt(value) : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;
    setSaving(true);
    try {
      await updateCar(car.id, {
        make: car.make,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        price: car.price,
        description: car.description,
        imageUrl: car.imageUrl,
      });
      alert('Car updated successfully!');
      router.push('/dealer/dashboard');
    } catch (error) {
      console.error("Failed to update car:", error);
      alert('Failed to update car.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Car</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
            <input type="text" id="make" name="make" value={car.make} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={saving} />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
            <input type="text" id="model" name="model" value={car.model} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={saving} />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
            <input type="number" id="year" name="year" value={car.year} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={saving} />
          </div>
          <div>
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage</label>
            <input type="number" id="mileage" name="mileage" value={car.mileage} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={saving} />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input type="number" id="price" name="price" value={car.price} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={saving} />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={car.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={saving} />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={car.description} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={saving}></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => router.push('/dealer/dashboard')} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600" disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarPage;
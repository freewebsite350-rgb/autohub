"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addCar } from '@/lib/api';

const AddCarPage = () => {
  const router = useRouter();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newCarData = {
        make,
        model,
        year: parseInt(year),
        mileage: parseInt(mileage),
        price: parseInt(price),
        description,
        imageUrl,
      };
      await addCar(newCarData);
      alert('Car added successfully!');
      router.push('/dealer/dashboard');
    } catch (error) {
      console.error("Failed to add car:", error);
      alert('Failed to add car.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Car</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
            <input type="text" id="make" value={make} onChange={(e) => setMake(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
            <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
            <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage</label>
            <input type="number" id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="/images/cars/placeholder.jpg" required disabled={loading} />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required disabled={loading}></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400" disabled={loading}>
            {loading ? 'Adding...' : 'Add Car'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarPage;
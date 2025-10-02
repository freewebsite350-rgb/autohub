"use client";

import { useState } from 'react';
import { cars } from '@/data/cars';

// A simple "AI" price suggestion function based on mock data
const suggestPrice = (make: string, model: string, year: number): number | null => {
  const matchingCars = cars.filter(
    (car) =>
      car.make.toLowerCase() === make.toLowerCase() &&
      car.model.toLowerCase() === model.toLowerCase()
  );

  if (matchingCars.length === 0) {
    return null; // No data for this make and model
  }

  // Calculate the average price for the given make and model
  const basePrice = matchingCars.reduce((sum, car) => sum + car.price, 0) / matchingCars.length;

  // Adjust the price based on the year (simple linear depreciation/appreciation)
  const averageYear = matchingCars.reduce((sum, car) => sum + car.year, 0) / matchingCars.length;
  const yearDifference = year - averageYear;
  const priceAdjustment = yearDifference * 1000; // Adjust by $1000 per year difference

  const suggestedPrice = basePrice + priceAdjustment;

  return Math.round(suggestedPrice / 100) * 100; // Round to the nearest hundred
};


const SuggestPricePage = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const price = suggestPrice(make, model, parseInt(year));
    setSuggestedPrice(price);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Price Suggestion</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
              <input type="text" id="make" value={make} onChange={(e) => setMake(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Toyota" required />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
              <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Camry" required />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 2022" required />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Suggest Price
            </button>
          </div>
        </form>
      </div>

      {searched && (
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md text-center">
          {suggestedPrice !== null ? (
            <div>
              <p className="text-lg text-gray-600">Estimated Fair Market Price:</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">${suggestedPrice.toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-lg text-gray-600">Could not determine a price. Please try a different make or model.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestPricePage;
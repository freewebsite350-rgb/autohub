"use client";

import { useState } from 'react';
import { Car } from '@/lib/types';
import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';

const BrowseCarsPage = () => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    maxMileage: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredCars = cars.filter(car => {
    return (
      (filters.make ? car.make.toLowerCase().includes(filters.make.toLowerCase()) : true) &&
      (filters.model ? car.model.toLowerCase().includes(filters.model.toLowerCase()) : true) &&
      (filters.year ? car.year === parseInt(filters.year) : true) &&
      (filters.minPrice ? car.price >= parseInt(filters.minPrice) : true) &&
      (filters.maxPrice ? car.price <= parseInt(filters.maxPrice) : true) &&
      (filters.maxMileage ? car.mileage <= parseInt(filters.maxMileage) : true)
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Browse Cars</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <input type="text" name="make" placeholder="Make" value={filters.make} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" />
          <input type="text" name="model" placeholder="Model" value={filters.model} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" />
          <input type="number" name="year" placeholder="Year" value={filters.year} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" />
          <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" />
          <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" />
          <input type="number" name="maxMileage" placeholder="Max Mileage" value={filters.maxMileage} onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <p>No cars match the current filters.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseCarsPage;
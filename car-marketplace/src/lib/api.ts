import { Car, Dealer } from './types';
import { cars as mockCars } from '@/data/cars';
import { dealers as mockDealers } from '@/data/dealers';

// This mock API simulates a real backend, like Supabase.
// It uses the mock data and introduces a delay to mimic network latency.

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- Car API ---

export const getCars = async (): Promise<Car[]> => {
  await delay(100); // Simulate a short delay
  return mockCars;
};

export const getCarById = async (id: string): Promise<Car | undefined> => {
  await delay(100);
  return mockCars.find(car => car.id === id);
};

export const addCar = async (carData: Omit<Car, 'id' | 'dealerId'>): Promise<Car> => {
  await delay(500);
  const newCar: Car = {
    id: `car-${Date.now()}`,
    dealerId: '1', // Assume logged-in dealer is '1' for now
    ...carData,
  };
  mockCars.unshift(newCar); // Add to the beginning of the array
  return newCar;
};

export const updateCar = async (id: string, carData: Partial<Omit<Car, 'id'>>): Promise<Car> => {
  await delay(500);
  const carIndex = mockCars.findIndex(car => car.id === id);
  if (carIndex === -1) {
    throw new Error('Car not found');
  }
  const updatedCar = { ...mockCars[carIndex], ...carData };
  mockCars[carIndex] = updatedCar;
  return updatedCar;
};

export const deleteCar = async (id: string): Promise<{ success: boolean }> => {
  await delay(500);
  const carIndex = mockCars.findIndex(car => car.id === id);
  if (carIndex === -1) {
    return { success: false };
  }
  mockCars.splice(carIndex, 1);
  return { success: true };
};


// --- Dealer API ---

export const getDealers = async (): Promise<Dealer[]> => {
    await delay(100);
    return mockDealers;
};

export const getDealerById = async (id: string): Promise<Dealer | undefined> => {
    await delay(100);
    return mockDealers.find(dealer => dealer.id === id);
};
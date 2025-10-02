import Image from 'next/image';

type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image_url: string;
}

type CarCardProps = {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 w-full">
        <Image
          src={car.image_url}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          {car.make} {car.model}
        </h2>
        <p className="text-gray-600">Year: {car.year}</p>
        <p className="text-green-600 font-semibold mt-2">
          ${car.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
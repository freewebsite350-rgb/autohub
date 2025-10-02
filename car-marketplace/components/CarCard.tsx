export default function CarCard({ car }: { car: any }) {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white">
      <img src={car.image_url} alt={car.model} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{car.make} {car.model}</h2>
      <p className="text-gray-600">Year: {car.year}</p>
      <p className="text-blue-600 font-bold mt-2">${car.price}</p>
    </div>
  )
}

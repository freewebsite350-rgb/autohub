import { supabase } from "@/lib/supabaseClient"
import CarCard from "@/components/CarCard"

export default async function Home() {
  const { data: cars } = await supabase.from("cars").select("*")

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚗 Car Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars?.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </main>
  )
}

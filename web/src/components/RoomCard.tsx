import Image from 'next/image';
import { Room } from '@/types/product';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const defaultImage =
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={room.imageUrl || defaultImage}
          alt={room.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          Up to {room.maxOccupancy ?? 2} Guests
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {room.title}
          </h3>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {room.description}
        </p>

        {/* Amenities Pills */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {room.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Footer & Price */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ${room.price}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400"> / night</span>
          </div>

          <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
            Book Room
          </button>
        </div>
      </div>
    </div>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { Room } from '../types/product';

const MOCK_ROOMS: Room[] = [
  {
    _id: '6ab569e89ae347f87b8263da',
    title: 'Executive Ocean Suite',
    description:
      'Spacious suite featuring panoramic ocean views, private balcony, king-size bed, and luxury spa bathroom.',
    price: 350,
    maxOccupancy: 2,
    amenities: ['Ocean View', 'King Bed', 'Free Wi-Fi', 'Balcony', 'Mini Bar'],
    isAvailable: true,
    imageUrl:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '7bc670f90bf458g98c9374eb',
    title: 'Deluxe Garden Villa',
    description:
      'Private villa surrounded by lush tropical gardens, featuring a plunge pool, king bedroom, and outdoor shower.',
    price: 280,
    maxOccupancy: 3,
    amenities: ['Garden View', 'Plunge Pool', 'Free Wi-Fi', 'Outdoor Shower'],
    isAvailable: true,
    imageUrl:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function getRooms(): Promise<Room[]> {
  try {
    const res = await fetch('http://127.0.0.1:4000/api/products', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.length > 0 ? data : MOCK_ROOMS;
  } catch (err) {
    return MOCK_ROOMS;
  }
}

export default async function HomePage() {
  const rooms = await getRooms();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Luxury Stays
          </span>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            Find Your Perfect Room
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {rooms.map((room) => (
            <Link
              key={room._id}
              href={`/rooms/${room._id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-60 w-full bg-slate-100 dark:bg-slate-800">
                <Image
                    src={
                        room.imageUrl ??
                        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800'
                    }
                    alt={room.title ?? 'Hotel Room'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {room.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {room.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    ${room.price} / night
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
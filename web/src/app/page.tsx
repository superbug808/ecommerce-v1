import Image from 'next/image';
import { Room } from '../types/product';
import Navbar from '../components/Navbar';
import RoomSearchFilter from '../components/RoomSearchFilter';

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      <Navbar />

      {/* Rich Luxury Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:px-12 lg:px-24 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white shadow-2xl">
        {/* Ambient background glow elements */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/30 shadow-inner">
              ✨ 5-Star Luxury Resort & Spa
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-[1.1]">
              Where Elegance Meets <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Absolute Comfort</span>
            </h1>
            <p className="text-base sm:text-lg text-indigo-100/80 max-w-xl mx-auto lg:mx-0 font-light">
              Immerse yourself in world-class amenities, breathtaking panoramic vistas, and meticulously crafted suites designed for pure relaxation.
            </p>
          </div>
          <div className="relative h-[280px] sm:h-[380px] w-full rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/30">
            <Image
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury Hotel Lobby"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Interactive Compact Bar & Rooms Grid */}
      <main className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <RoomSearchFilter initialRooms={rooms} />
      </main>
    </div>
  );
}
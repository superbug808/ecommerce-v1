import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Room } from '../../../types/product';
import BookingForm from '../../../components/BookingForm';

interface RoomPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getRoom(id: string): Promise<Room | null> {
  try {
    const res = await fetch(`http://localhost:4000/api/products/${id}`, {
      cache: 'no-store',
    });

    if (res.status === 440 || res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch room details: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    //console.error(`Error fetching room ${id}:`, error);
    //return null;

    console.error(`API fetch failed for room ID ${id}, using fallback data:`, error);
    
    // Fallback data so pages render during development
    return {
      _id: id,
      title: 'Executive Ocean Suite',
      description:
        'Spacious suite featuring panoramic ocean views, private balcony, king-size bed, and luxury spa bathroom.',
      price: 350,
      maxOccupancy: 2,
      amenities: ['Ocean View', 'King Bed', 'Free Wi-Fi', 'Balcony', 'Mini Bar'],
      isAvailable: true,
      imageUrl:
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

  }
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  // Await the params object first
  const { id } = await params;
  
  const room = await getRoom(id);


  if (!room) {
    notFound();
  }

  const defaultImage =
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200';

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Navigation Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            ← Back to all rooms
          </Link>
        </nav>

        {/* Hero Image Header */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-3xl shadow-lg sm:h-[500px]">
          <Image
            src={room.imageUrl || defaultImage}
            alt={room.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <span className="inline-block rounded-full bg-indigo-600 px-3.5 py-1 text-xs font-semibold text-white">
              Up to {room.maxOccupancy ?? 2} Guests
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-5xl">
              {room.title}
            </h1>
          </div>
        </div>

        {/* Content & Booking Grid */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Details (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                About this suite
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
                {room.description}
              </p>
            </section>

            {/* Amenities Section */}
            {room.amenities && room.amenities.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Room Amenities
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {room.amenities.map((amenity: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60"
                    >
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Booking Form Sidebar (Right 1 Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm room={room} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
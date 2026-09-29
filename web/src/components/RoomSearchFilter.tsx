'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Room } from '../types/product';

interface RoomSearchFilterProps {
  initialRooms: Room[];
}

export default function RoomSearchFilter({ initialRooms }: RoomSearchFilterProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const filteredRooms = initialRooms.filter((room) => {
    const maxOcc = room.maxOccupancy ?? 2;
    return maxOcc >= guests;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTriggered(true);
  };

  const handleReset = () => {
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
    setSearchTriggered(false);
  };

  return (
    <div>
      {/* Compact Floating Search Bar */}
      <div className="relative -mt-12 mx-auto max-w-4xl px-4 z-20 mb-16">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center gap-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 p-3 shadow-2xl backdrop-blur-xl border border-indigo-500/20"
        >
          {/* Check-in Dropdown / Input */}
          <div className="w-full md:flex-1 flex flex-col px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
            <label className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer mt-0.5"
            />
          </div>

          <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Check-out Dropdown / Input */}
          <div className="w-full md:flex-1 flex flex-col px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
            <label className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer mt-0.5"
            />
          </div>

          <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Guests Dropdown */}
          <div className="w-full md:w-40 flex flex-col px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
            <label className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 dark:text-white focus:outline-none cursor-pointer mt-0.5"
            >
              <option value={1} className="dark:bg-slate-900">1 Guest</option>
              <option value={2} className="dark:bg-slate-900">2 Guests</option>
              <option value={3} className="dark:bg-slate-900">3 Guests</option>
              <option value={4} className="dark:bg-slate-900">4+ Guests</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <button
              type="submit"
              className="w-full md:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/30 hover:opacity-95 transition-all"
            >
              Check Availability
            </button>
            {searchTriggered && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-500 dark:text-amber-400">
            <span>★</span> GrandVista Collection
          </span>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {searchTriggered ? `Available Suites (${filteredRooms.length})` : 'Featured Luxury Suites'}
          </h2>
        </div>
      </div>

      {/* Rooms Grid with Colored Accents */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <Link
            key={room._id}
            href={`/rooms/${room._id}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image
                src={
                  room.imageUrl ??
                  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800'
                }
                alt={room.title ?? 'Hotel Room'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Gold / Amber Price Tag Badge */}
              <span className="absolute top-4 right-4 rounded-full bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-amber-400 shadow border border-amber-500/30">
                ${room.price} <span className="text-[10px] text-slate-300 font-normal">/ night</span>
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {room.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Max {room.maxOccupancy ?? 2} Guests
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  Explore &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
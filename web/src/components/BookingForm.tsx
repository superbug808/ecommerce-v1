'use client';

import { useState, FormEvent } from 'react';
import { Room } from '../types/product';

interface BookingFormProps {
  room: Room;
}

export default function BookingForm({ room }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const calculateTotal = (): number => {
    if (!checkIn || !checkOut) return room.price;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 3600 * 24)));
    return room.price * nights;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setBookingSuccess(true);
  };

  if (bookingSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900/50 dark:bg-emerald-950/40">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
          ✓
        </div>
        <h3 className="mt-3 text-lg font-bold text-emerald-900 dark:text-emerald-200">
          Reservation Confirmed!
        </h3>
        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
          We sent your booking confirmation details to {guestEmail}.
        </p>
        <button
          onClick={() => setBookingSuccess(false)}
          className="mt-6 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
        >
          Book Another Stay
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-baseline justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            ${room.price}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400"> / night</span>
        </div>
        <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">
          {room.isAvailable !== false ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
            Guest Name
          </label>
          <input
            type="text"
            required
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="John Doe"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
            Email Address
          </label>
          <input
            type="email"
            required
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="john@example.com"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
              Check-In
            </label>
            <input
              type="date"
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
              Check-Out
            </label>
            <input
              type="date"
              required
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {Array.from({ length: room.maxOccupancy ?? 2 }, (_, i) => i + 1).map((num: number) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex justify-between text-sm font-semibold text-slate-900 dark:text-white">
            <span>Estimated Total</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Reserve Now'}
        </button>
      </form>
    </div>
  );
}
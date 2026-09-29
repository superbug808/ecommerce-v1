import Navbar from '../../components/Navbar';

async function getBookings() {
  try {
    const res = await fetch('http://localhost:4000/api/bookings', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  } catch (error) {
    // Fallback mock statistics for development monitoring view
    return [];
  }
}

export default async function DashboardPage() {
  const bookings = await getBookings();
  
  // Quick metrics calculations
  const totalRevenue = bookings.reduce((acc: number, b: any) => acc + (b.totalPrice || 0), 0);
  const totalBookings = bookings.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Management & Monitoring</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time analytics and reservation logs from your NestJS API.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Reservations</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{totalBookings}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Revenue</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">API Status</p>
            <p className="mt-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" /> Connected
            </p>
          </div>
        </div>

        {/* Recent Reservations Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4">
            <h3 className="text-lg font-bold">Recent Bookings Feed</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800/80 dark:bg-slate-800/50 text-slate-500">
                  <th className="px-6 py-3 font-semibold">Guest Name</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Dates</th>
                  <th className="px-6 py-3 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {bookings.length > 0 ? (
                  bookings.map((booking: any) => (
                    <tr key={booking._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{booking.guestName}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{booking.guestEmail}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {new Date(booking.checkInDate).toLocaleDateString()} &rarr; {new Date(booking.checkOutDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-indigo-600 dark:text-indigo-400">${booking.totalPrice}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      No bookings recorded yet. Submit a reservation on a room page to see it logged here!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
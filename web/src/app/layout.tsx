import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hotel Booking Platform',
  description: 'Book luxury rooms and suites',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased dark:bg-slate-950">
        {children}
      </body>
    </html>
  );
}
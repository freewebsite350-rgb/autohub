import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Marketplace",
  description: "Find your next car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              CarMart
            </Link>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/cars" className="text-gray-600 hover:text-gray-900">
                Browse Cars
              </Link>
              <Link href="/dealer/login" className="text-gray-600 hover:text-gray-900">
                Dealer Login
              </Link>
              <Link href="/suggest-price" className="text-gray-600 hover:text-gray-900">
                Suggest Price
              </Link>
              <Link href="/dealer/dashboard" className="text-gray-600 hover:text-gray-900">
                Dealer Dashboard
              </Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-6 py-8">
          {children}
        </main>
        <footer className="bg-white shadow-md mt-8">
          <div className="container mx-auto px-6 py-4 text-center text-gray-600">
            &copy; {new Date().getFullYear()} CarMart. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Nav from "./components/Nav/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rivas Pro Painting Dashboard",
  description: "Rivas Pro Painting Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* Summary (10/3/25) */}
          {/* Simple authentication is set up and working */}
          {/* route.ts is set up for under /api/auth/* (used for login, logout, me, etc.) */}
          {/* middleware.ts is set up for all requests (used for authentication - checks if user is logged in) */}

          {/* TODO: Fix Nav component so it's knows when to display logout and login buttons */}
          {/* TODO: Fix useAuth hook so it's knows when to display the user's name and logout button */}
          {/* TODO: CompanyList component was just used for testing - remove it */}
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}

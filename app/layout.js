import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import DarkModeToggle from './components/DarkModeToggle';
import { DataProvider } from "./context/DataContext"; // Import the provider
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "DailyPulse",
  description: "Stay updated with DailyPulse - Your daily news source",
  url: "https://dailypulse.com", // Replace with your site's URL
  image: "https://dailypulse.com/og-image.jpg", // Replace with your Open Graph image
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <DataProvider>

      <html lang="en">
        <Head>
          {/* Basic Meta Tags */}
          <meta name="description" content={metadata.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:url" content={metadata.url} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={metadata.image} />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={metadata.image} />

          {/* Additional Meta Tags */}
          <meta name="theme-color" content="#ffffff" />
          <link rel="icon" href="/favicon.ico" />

          {/* Custom Fonts Preload (Optional for performance) */}
          <link
            rel="preload"
            href="./fonts/GeistVF.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
            />
          <link
            rel="preload"
            href="./fonts/GeistMonoVF.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
            />

          {/* SEO enhancements */}
          <meta name="robots" content="index, follow" />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <Navbar />
          <DarkModeToggle />
          {children}
        </body>
      </html>
          </DataProvider>
    </ClerkProvider>
  );
}

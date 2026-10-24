import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "@/components/navigation/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KINETIX ATELIER • Precision 3D Footwear & Virtual Model Styling",
  description:
    "Experience next-generation footwear architecture. Real-time 3D WebGL multi-zone shoe customization, dynamic virtual model lookbook matching, and carbon-propulsion engineering.",
  keywords: [
    "Kinetix Atelier",
    "3D Shoe Customizer",
    "Sustainable Footwear",
    "Virtual Model Lookbook",
    "WebGL Sneaker Studio",
    "Italian Handcrafted Shoes",
    "Carbon Fiber Running Shoes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F7F2] text-[#181818]">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar"; // Removed SidebarTrigger as it is unused

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SRP",
  description: "Transforming careers and businesses for over two decades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-customBg text-black`}
      >
        <SidebarProvider
          className="flex flex-col min-h-screen"
          defaultOpen={false}
        >
          <Navbar />
          <main className="flex-grow mt-20 sm:mt-0 min-h-screen">
            {children}
          </main>
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}

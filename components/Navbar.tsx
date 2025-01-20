"use client";

import { usePathname } from "next/navigation"; // Import usePathname hook
import Image from "next/image";
import Link from "next/link";

import { AppSidebar } from "./app-sidebar";
import { SidebarTrigger } from "./ui/sidebar";
import { navbar } from "@/data/navbar";

export default function Navbar() {
  const pathname = usePathname(); // Get the current path

  return (
    <nav className="flex flex-col w-full md:flex-row justify-between items-center p-2 md:p-4 container mx-auto my-4 md:my-10 md:max-h-10 bg-customBg">
      <div className="flex items-center justify-between w-full">
        <Image src="/logo.svg" alt="Logo" width={70} height={70} />
        <SidebarTrigger className="md:hidden w-10 h-10 text-customPrimary cursor-pointer" />
      </div>
      <div className="hidden md:flex space-x-4 w-full">
        {navbar.map((item) => {
          const isActive = pathname === item.url; // Check if the current path matches the item's URL

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`${
                isActive
                  ? "text-customSecondary underline underline-offset-4 decoration-customSecondary decoration-2"
                  : "text-customTextFont"
              } hover:underline hover:underline-offset-4 hover:decoration-customSecondary hover:decoration-2 active:underline active:underline-offset-4 active:decoration-customSecondary active:decoration-2`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <AppSidebar />
    </nav>
  );
}

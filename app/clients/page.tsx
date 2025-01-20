"use client";

import { partnersImages } from "@/data/partners";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PartnersPage() {
  return (
    <main className="bg-customTextFont min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {partnersImages.map((partner, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className=" rounded-lg p-6 flex items-center justify-center"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={partner.src}
                  alt={`Partner ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}

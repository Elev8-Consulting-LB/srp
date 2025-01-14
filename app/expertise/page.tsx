"use client";
import { areaOfExpertise, hero, whyChooseSrp } from "@/data/ourExpertise";
import { motion } from "framer-motion";

import Image from "next/image";
import React from "react";

const page = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  return (
    <main className="overflow-hidden">
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B5B] mb-8 text-center underline underline-offset-8 decoration-customSecondary">
              {hero.title}
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={hero.image}
                alt="Business Handshake"
                width={1200}
                height={600}
                className="w-full h-auto"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#002B5B] to-transparent opacity-30"></div>
            </motion.div>
            <p className="text-lg text-gray-700 mb-12 text-center leading-relaxed mt-10 italic">
              {hero.desc}
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B5B] mb-8">
              {whyChooseSrp.title}
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {whyChooseSrp.desc1}
            </p>
            <div className="h-1 bg-customSecondary my-8"></div>
            <p className="text-xl text-gray-700 leading-relaxed">
              {whyChooseSrp.desc2}
            </p>
          </motion.div>
        </div>
      </section>
      {/* Our Global Reach Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B5B] mb-12 text-center">
              Industries We Serve
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {areaOfExpertise.map((expertise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex gap-3 justify-between items-center"
                >
                  <Image
                    src={expertise.icon}
                    width={50}
                    height={50}
                    alt={expertise.title}
                  />
                  <h3 className="text-lg font-semibold text-customPrimary mb-6">
                    {expertise.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default page;

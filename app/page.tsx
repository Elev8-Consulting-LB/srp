"use client";

import { Button } from "@/components/ui/button";
import { about, features, header, specialitize } from "@/data/homePage";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Header */}
      <section className="bg-[#D0D8ED] min-h-screen flex flex-col justify-center items-center py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <motion.div
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-customPrimary tracking-wide leading-tight mb-6">
              {header.title}
            </h1>
            <p className="text-lg md:text-xl text-customPrimary tracking-wide mb-8">
              {header.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#whoWeAre"
                className="bg-customPrimary hover:bg-customSecondary text-white px-8 py-3 rounded-full text-lg transition-colors duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/expertise"
                className="text-customSecondary bg-transparent border-2 border-customSecondary hover:bg-customSecondary hover:text-white px-8 py-3 rounded-full text-lg transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/g10.png"
              alt="Hero Image"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-white" id="whoWeAre">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="w-full md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-customPrimary mb-6">
                {about.title}
              </h2>
              <p className="text-lg text-customPrimary">{about.description}</p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src="/logo.svg"
                alt="About"
                width={1000}
                height={1000}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialitize */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch min-h-[500px]">
            <motion.div
              className="w-full md:w-1/2 mb-8 md:mb-0 order-2 md:order-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="/hands.png"
                alt="Specialitize"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 order-1 md:order-2 flex"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-customPrimary p-8 md:p-12 rounded-lg shadow-lg flex flex-col justify-center items-center w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {specialitize.title}
                </h2>
                <p className="text-lg text-white text-center">
                  {specialitize.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#002B5B] text-center mb-12"
          >
            What Makes Us Stand Out?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 rounded-3xl border-[#FF6B6B] border-2 min-h-52 hover:shadow-lg transition-shadow duration-300 bg-gray-50">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#002B5B] mb-8">
                    {feature.title}
                  </h3>
                  <Link
                    href={feature.link}
                    className="p-0 text-[#002B5B] w-full flex gap-2 hover:text-[#FF6B6B] transition-colors duration-300 font-medium"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employers and Job Hunters Section */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Employers Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#002B5B] p-12 md:p-16 lg:p-24 flex flex-col items-center text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-12">
              Looking for the best talent? Let&apos;s work together.
            </h2>
            <div className="mb-12">
              <Image
                src="/Business Handshake.png"
                alt="Handshake Icon"
                width={100}
                height={100}
                className="w-24 h-24 mx-auto"
              />
            </div>
            <Link
              href="/contact-us"
              className="bg-white text-[#002B5B] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Job Hunters Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-12 md:p-16 lg:p-24 flex flex-col items-center text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#002B5B] mb-12">
              Ready to take the next step in your career?
            </h2>
            <div className="mb-12">
              <Image
                src="/Hand Held.png"
                alt="CV Icon"
                width={100}
                height={100}
                className="w-24 h-24 mx-auto"
              />
            </div>
            <Link
              href="/agreement"
              className="bg-transparent border-2 border-[#002B5B] text-[#002B5B] hover:bg-[#002B5B] hover:text-white rounded-full px-8 py-6 text-lg font-semibold transition-colors duration-300"
            >
              Submit Your CV
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

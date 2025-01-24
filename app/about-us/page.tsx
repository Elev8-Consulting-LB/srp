"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const regions = [
    {
      name: "Middle East",
      countries: [
        "Lebanon",
        "Bahrain",
        "Kuwait",
        "Egypt",
        "Jordan",
        "Oman",
        "Qatar",
        "Saudi Arabia",
        "UAE",
        "Iraq",
      ],
    },
    {
      name: "Asia",
      countries: [
        "India",
        "Pakistan",
        "Philippines",
        "Thailand",
        "Vietnam",
        "Bangladesh",
      ],
    },
    {
      name: "Europe",
      countries: ["Greece", "Serbia", "Ukraine"],
    },
    {
      name: "Africa",
      countries: ["Cape Town", "Durban"],
    },
  ];

  const features = [
    {
      title: "Depth of expertise and industry insights",
      icon: "📊",
    },
    {
      title: "Creative problem-solving approaches",
      icon: "💡",
    },
    {
      title: "Proven track record of success",
      icon: "🏆",
    },
    {
      title: "Ethical and transparent practices",
      icon: "🤝",
    },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-customTextFont/80  to-customTextFont/50 text-white py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
                Supreme Recruitment Partners
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Transforming careers and businesses for over two decades
              </p>
            </motion.div>
            <Image
              src="/Element.jpeg"
              alt="Team Meeting"
              width={600}
              height={600}
              className="absolute inset-0 bg-gradient-to-t from-[#002B5B] to-transparent opacity-30 rounded-lg top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-customTextFont mb-10">
              Who We Are
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed text-justify">
              Supreme Recruitment Partners (SRP) is a leading human resources
              consulting firm with over 40 years of experience in transforming
              people&apos;s lives. We specialize in recruiting for various job
              levels, from unskilled workers to D-Level Executives, ensuring
              that the right talent meets the right opportunities.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed text-justify">
              Our dynamic presence spans the Arabian Gulf, connecting local and
              multinational companies with exceptional candidates.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Mission Section */}
          <div className="flex flex-col md:flex-row items-stretch mb-16 md:mb-24">
            <motion.div
              className="w-full md:w-1/2 flex order-2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-customTextFont p-8 md:p-12 rounded-lg shadow-lg flex flex-col justify-center items-start w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Mission
                </h2>
                <p className="text-lg text-white text-justify">
                  At Supreme Recruitment Partners, our mission is to align our
                  recruitment strategies with our clients&apos; objectives,
                  providing in-depth search and selection, valuable expertise,
                  and high-quality, suitable candidates across diverse
                  industries. We strive to help businesses unlock significant
                  value and drive sustainable growth while empowering candidates
                  to achieve their career aspirations.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 mb-8 md:mb-0 order-1 md:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src="/missionThumbnail.png"
                alt="Mission"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>

          {/* Vision Section */}
          <div className="flex flex-col md:flex-row items-stretch">
            <motion.div
              className="w-full md:w-1/2 mb-8 md:mb-0 order-1 md:order-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src="/visionThumbnail.png"
                alt="Vision"
                width={2000}
                height={2000}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 flex order-2 md:order-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-customTextFont p-8 md:p-12 rounded-lg shadow-lg flex flex-col justify-center items-start w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-white text-justify">
                  Our vision is to become the most trusted and respected
                  recruitment partner in the region, known for upholding the
                  highest standards of business ethics and practices. We aim to
                  care for and support our candidates, respect our associates,
                  and provide transparent, efficient services to our clients
                  while meeting their needs punctually and professionally.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Specialize In Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-customTextFont mb-10 text-center">
              What We Specialize In
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed text-justify">
              At SRP, we focus on finding the most talented candidates with the
              necessary qualifications and experience to meet our clients’
              unique requirements. From skilled professionals to executive-level
              hires, we connect businesses with top talent that drives growth
              and success.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/pexels-pavel-danilyuk-5520322 1.png"
                alt="Business Handshake"
                width={1200}
                height={600}
                className="w-full h-auto"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#002B5B] to-transparent opacity-30"></div>
            </motion.div>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed mt-10 text-justify">
              We support clients across diverse industries, including oil & gas,
              EPC contractors, construction, manufacturing, and facility
              management. By leveraging our expertise, we help businesses
              improve performance and achieve exceptional results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-customTextFont mb-10 text-center">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed my-10 text-justify">
              We understand the market, industries, and the potential impact of
              the right candidate in the right position. Our Associate
              Consultants, located across the Middle East, Europe, Asia, and
              South Africa, work tirelessly to ensure your business thrives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-customTextFont mb-2">
                    {feature.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Global Reach Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-customTextFont mb-10 text-center">
              Our Global Reach
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed my-10 text-justify">
              With a presence across the Arabian Gulf, Europe, Asia, and South
              Africa, SRP&apos;s recruitment services are truly global. We have
              successfully partnered with clients and candidates from:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regions.map((region, index) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-customTextFont mb-6">
                    {region.name}
                  </h3>
                  <ul className="text-gray-700 grid grid-cols-1 md:grid-cols-3 gap-2">
                    {(region.name === "Middle East"
                      ? [
                          "Lebanon",
                          ...region.countries
                            .filter((c) => c !== "Lebanon")
                            .sort((a, b) => a.localeCompare(b)),
                        ]
                      : region.countries.sort((a, b) => a.localeCompare(b))
                    ).map((country, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-customTextFont rounded-full mr-2"></span>
                        {country}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

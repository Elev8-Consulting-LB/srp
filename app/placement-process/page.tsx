"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

interface TimelineItemProps {
  title: string;
  icon: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, icon, index }) => {
  return (
    <div className={`w-1/2 ${index % 2 === 0 ? "pl-8" : "pr-8"}`}>
      <div className="bg-white rounded-lg shadow-md p-4">
        <Image
          src={icon}
          alt={title}
          width={1200}
          height={800}
          className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
        />
        <h3 className="text-lg font-semibold text-customPrimary text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

const Page = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const timelineEvents = [
    {
      title: "Job Description",
      icon: "/bro.png",
    },
    {
      title: "Expected Deployment Dates",
      icon: "/pana.png",
    },
    {
      title: "Clients Proper & Accurate Documentations",
      icon: "/cuate.png",
    },
    {
      title: "Check Our Data Bank & Source the Best Talent",
      icon: "/amico.png",
    },
    {
      title: "Interview",
      icon: "/amico2.png",
    },
    {
      title: "Trade Test (Blue Collar)",
      icon: "/amico3.png",
    },
    {
      title: "Prescreening best Suited",
      icon: "/amico4.png",
    },
    {
      title: "Final Selection",
      icon: "/pana2.png",
    },
    {
      title: "Medical",
      icon: "/pana3.png",
    },
    {
      title: "Visa",
      icon: "/cuate2.png",
    },
    {
      title: "Travel Arrangement",
      icon: "/cuate3.png",
    },
    {
      title: "Deployment as per activity No. 2",
      icon: "/pana4.png",
    },
  ];

  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (timelineRef.current) {
      const timeline = timelineRef.current;
      const items = timelineItemsRef.current;

      gsap.fromTo(
        [timeline, timeline.children],
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          transformOrigin: "top center",
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: timeline,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      items.forEach((item) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                end: "center center",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }
  }, []);

  return (
    <main className="overflow-hidden">
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 via-gray-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-customPrimary mb-12 text-center underline underline-offset-8 decoration-customSecondary">
              Placement Process
            </h2>
          </motion.div>

          {/* Timeline for Desktop */}
          <div className="hidden md:block relative max-w-4xl mx-auto">
            <div
              ref={timelineRef}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-customPrimary transform -translate-x-1/2"
            >
              {timelineEvents.map((_, index) => (
                <div
                  key={index}
                  className="absolute w-8 h-8 bg-customPrimary rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    top: `calc(${
                      (index / (timelineEvents.length - 1)) * 100
                    }% - 16px)`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="space-y-24">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    timelineItemsRef.current[index] = el;
                  }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <TimelineItem
                    title={event.title}
                    icon={event.icon}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cards for Mobile */}
          <div className="md:hidden grid grid-cols-1 gap-6 sm:grid-cols-2">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <Image
                  src={event.icon}
                  alt={event.title}
                  width={1200}
                  height={1200}
                  className="w-16 h-16 mb-4 rounded-full object-cover"
                />
                <h3 className="text-lg font-semibold text-customPrimary text-center">
                  {event.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Procedure Section */}
      <section className="py-20 bg-customPrimary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center underline underline-offset-8 decoration-customSecondary">
              Recruitment Procedure
            </h2>
            <p className="mb-8 text-justify">
              On receiving the manpower requirements from our client, Supreme
              Recruitment Partners - SRP analyzes and initiates the sourcing
              process.
            </p>
            <h3 className="text-2xl font-bold mb-4">Prerequisite:</h3>
            <ul className="list-decimal pl-6 mb-8 space-y-4">
              <li>
                It is a prerequisite for the client to formally provide the
                below documents:
                <ul className="list-disc pl-6 text-justify">
                  <li>Demand Letter</li>
                  <li>Power of Attorney</li>
                  <li>Recruitment Agreement – if applicable</li>
                  <li>Expected Joining Dates</li>
                </ul>
              </li>
              <li className="text-justify">
                After receiving the above documents, we will start sourcing,
                prescreening, and shortlisting the prospects for suitability to
                the client&apos;s specific requirements.
              </li>
              <li className="text-justify">
                Upon receiving the shortlisted candidates approved by our
                client, we will coordinate a suitable date for the final
                selection, either the client will send his/their
                representative(s) to our offices or arrange and conduct an
                interview via video conference.
              </li>
              <li className="text-justify">
                The client will then issue a job offer letter in accordance with
                the terms and conditions required by the labor laws of their
                respective country.
              </li>
              <li className="text-justify">
                The client will issue, if applicable, the joining flight ticket.
              </li>
              <li className="text-justify">
                SRP will complete the selection process and ensure the smooth
                placement/deployment of the selected candidates.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Page;

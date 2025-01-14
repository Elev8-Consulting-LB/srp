import Image from "next/image";

interface TimelineCardProps {
  title: string;
  icon: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ title, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center mb-8 w-full max-w-md mx-auto">
      <Image
        src={icon}
        width={200}
        height={200}
        alt={title}
        className="rounded-full object-cover mx-auto"
      />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    </div>
  );
};

export default TimelineCard;

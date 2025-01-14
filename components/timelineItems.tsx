import Image from "next/image";

interface TimelineItemProps {
  title: string;
  icon: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, icon, index }) => {
  return (
    <div
      className={`flex items-center gap-4 ${
        index % 2 === 0 ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="w-1/2 flex justify-center">
        <div className="p-4">
          <Image
            src={icon}
            width={200}
            height={200}
            alt={title}
            className="rounded-full object-cover"
          />
        </div>
      </div>
      <div className="w-1/2">
        <div className={` p-4 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
          <h3 className="text-lg font-semibold text-customPrimary">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;

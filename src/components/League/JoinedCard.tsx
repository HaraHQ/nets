import { League } from "nets/types";
import { FC } from "react";

const JoinedCard: FC<League> = ({
  level,
  title,
  season,
  location,
  start,
  end,
}) => {
  const levelGenerator = (level: number) => {
    const temp = {
      color: "purple",
      level: "Advanced"
    }
    switch (level) {
      case 1:
        temp.color = "green";
        temp.level = "Beginner";
        break;
      case 2:
        temp.color = "blue";
        temp.level = "Intemediate";
        break;
      case 3:
        temp.color = "purple";
        temp.level = "Advanced";
        break;
    }
    return temp;
  }
  const formatToMonthYear = (dateStr: string): string => {
    const [year, month] = dateStr.split("-");
    if (!year || !month) {
      throw new Error("Invalid date format. Expected YYYY-MM-DD.");
    }
    return `${month}/${year}`;
  }
  return (
    <div className="border rounded-lg">
      <div className="px-2 py-3">
        <div className="text-sm font-semibold leading-5">
          {title}
        </div>
        <div className="text-xs font-normal leading-5 text-gray-400">
          Season {season}
        </div>
        <div className="text-xs font-normal leading-5 text-gray-800">
          {location} {formatToMonthYear(start)} - {formatToMonthYear(end)}
        </div>
        <div className="py-2 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: levelGenerator(level).color }} />
          <span className="text-xs font-semibold text-gray-800">
            {levelGenerator(level).level}
          </span>
        </div>  
      </div>
      <div className="border-t bg-gray-200 p-2 flex justify-end text-sm font-semibold">
        You're Joining This League
      </div>
    </div>
  )
}

export default JoinedCard;
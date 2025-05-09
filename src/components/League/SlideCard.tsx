import { FC } from "react";
import { GoArrowRight } from "react-icons/go";
import { HiStar } from "react-icons/hi2";
import { motion } from "framer-motion";
import { League } from "nets/types";

const LeagueSlideCard: FC<League> = ({
  end,
  mode,
  start,
  title,
  point,
}) => {
  const modeGenerator = (mode: string) => {
    const parse = JSON.parse(mode);
    const temp = {
      single: parse.includes(1),
      double: parse.includes(2),
      team: parse.includes(3),
    }
    let text = "Not Available";
    if (temp.single && temp.double && temp.team) {
      text = "Single, Double & Team Available";
    }
    if (temp.single && temp.double && !temp.team) {
      text = "Single & Double Available";
    }
    if (temp.double && temp.team && !temp.single) {
      text = "Double & Team Available"
    }
    // bebas mau nambahin lagi disini... hehe
    return text;
  }
  const formatIndonesianDate = (dateStr: string): string => {
    const bulanIndo = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
  
    const [year, month, day] = dateStr.split("-").map(Number);
  
    if (!year || !month || !day) return dateStr;
  
    const formattedDay = day.toString().padStart(2, "0");
    const monthName = bulanIndo[month - 1];
  
    return `${formattedDay} ${monthName} ${year}`;
  }
  return (
    <div className="bg-amber-400 p-2.5 min-h-[162px]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-sm font-medium leading-6 text-[#1B2C5F]">
            {title}
          </div>
          <div className="text-[10pt] font-medium leading-6 text-[#AF8403]">
            {modeGenerator(mode)}
          </div>
          <div className="text-[10pt] font-medium leading-6 text-[#1B2C5F]">
            {formatIndonesianDate(start)} - {formatIndonesianDate(end)}
          </div>
          <div className="text-[10pt] font-medium leading-6 text-[#1B2C5F] flex items-center gap-2">
            Tournament Points{" "}
            <div className="px-2 py-1 rounded-lg bg-white flex justify-between items-center">
              <HiStar className="text-amber-400" />
              <div className="pl-2 text-right">
                {point}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start">
          <motion.button whileTap={{ y: 1 }} className="w-[151px] p-3 bg-blue-700 text-white flex items-center gap-2 rounded-2xl select-none cursor-pointer">
            <div className="flex-1 text-[11pt]">Register Now</div>
            <GoArrowRight />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default LeagueSlideCard;
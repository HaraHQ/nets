import Image from "next/image";
import { FC } from "react";
import { RankCardProps, generateDelta } from "./Card";

const SmallCard: FC<RankCardProps> = ({ delta, name, points, rank }) => {
  return (
    <div className="bg-gray-200 flex justify-between rounded-xl h-[72px]">
      <div className="flex">
        <div
          id="sml-card-rank"
          className="text-[#2E55CE] h-full w-[65px] flex justify-center items-center text-2xl leading-5"
        >
          {rank}
        </div>
        <div id="sml-card-img" className="w-[50px] flex items-center">
          <Image
            src={`/players/1.webp`}
            width={37}
            height={37}
            alt="1"
            className="object-cover rounded-full"
          />
        </div>
        <div id="sml-card-info" className="flex flex-col justify-center gap-1">
          <div
            className="text-[#1B2C5F] text-base font-normal"
            title={name}
          >
            {name}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="bg-white/80 text-[#1B2C5F] text-xs font-normal rounded px-2 py-1">
              Points{" "}
              <span className="text-fuchsia-500 font-semibold">{(points || 0).toLocaleString("en-US")}</span>
            </div>

            <div className={`text-xs font-bold text-green-400`}>
              {delta !== 0 && `${generateDelta(delta).symbol} ${Math.abs(delta)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;

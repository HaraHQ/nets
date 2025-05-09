import Image from "next/image";
import { FC } from "react";

export type RankCardProps = {
  name: string;
  points: number;
  rank: number;
  delta: number;
};

export const generateDelta = (delta: number) => {
  if (delta > 0) {
    return { class: "text-green-400", symbol: "▲" }
  } else
  if (delta < 0) {
    return { class: "text-red-400", symbol: "▼" }
  } else
  {
    return { class: "text-gray-200", symbol: "-" }
  }
}

const RankCard: FC<RankCardProps> = ({ name, points, rank, delta }) => {
  return (
    <div className="relative w-full h-[358px]">
      <Image
        src={`/players/1.webp`}
        alt={name}
        fill
        className="object-cover"
      />
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent select-none">
        <div className="flex items-end gap-4">
          <div className="text-white text-5xl font-bold">{rank}</div>
          <div className="w-full">
            <div className="text-white text-2xl font-medium h-8 w-[85%] truncate" title={name}>{name}</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-white/80 text-[#1B2C5F] text-xs font-semibold rounded px-2 py-1">
                Points{" "}
                <span className="text-fuchsia-500">
                  {(points || 0).toLocaleString("en-US")}
                </span>
              </div>
              <div
                className={`text-xs font-bold ${
                  generateDelta(delta).class
                }`}
              >
                {delta !== 0 && `${generateDelta(delta).symbol} ${Math.abs(delta)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankCard;

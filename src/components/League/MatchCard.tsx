import { League, ParsedMatch } from "nets/types";
import { FC } from "react";
import PlayIcon from "../icons/Play";

const MatchCard: FC<ParsedMatch> = ({
  mode,
  players,
  score,
}) => {
  return (
    <div className="border rounded-lg">
      <div className="px-2 py-3">
        <div>
          <PlayIcon />
        </div>
        <div className="bg-gray-200 py-2 w-full text-center text-gray-400 text-sm capitalize">{mode}</div>
        <div className="py-1 w-full text-center text-gray-300 text-xs">{!score ? "Score not available" : score}</div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex-1 flex flex-col text-[10pt]">
            <div>{players.left[0]}</div>
            <div className="border-b w-full h-[1px]" />
            <div>{players.left[1]}</div>
          </div>
          <div className="w-1 bg-black h-12 grow-0" />
          <div className="flex-1 flex flex-col text-right text-[10pt]">
            <div>{players.right[0]}</div>
            <div className="border-b w-full h-[1px]" />
            <div>{players.right[1]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchCard;
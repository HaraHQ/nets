import { FC } from "react";
import { HiUser } from "react-icons/hi2";
import { HiStar } from "react-icons/hi";
import FollowersIcon from "../icons/Followers";
import Image from "next/image";

const UserCard: FC = () => {
  return (
    <div className="flex items-center gap-4 border-b p-4">
      <div className="ring-8 ring-gray-100 rounded-full">
        <Image
          src={`/players/1.webp`}
          width={58}
          height={58}
          alt="1"
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-sm leading-6 font-semibold text-[#1B2C5F]">
          Khaled Mokhtar
        </div>
        <div className="text-xs leading-5 text-[#192E6D]">
          khaledmokhtar.km@gmail.com
        </div>
        <div className="flex gap-2 text-[10pt] ">
          <div className="flex items-center gap-1">
            <FollowersIcon /> <span className="text-[#192E6D]">1</span>
          </div>
          <div className="flex items-center gap-1">
            <HiUser className="text-[#1B2C5F]" />{" "}
            <span className="text-[#192E6D]">Male</span>
          </div>
          <div className="flex items-center gap-1">
            <HiStar className="text-amber-400" />{" "}
            <span className="text-[#192E6D]">1,700</span>
          </div>
          <div className="p-1 px-2 bg-gray-400 text-white rounded-xl">
            Silver
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;
import { FC } from "react";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import useConfig from "nets/stores/useConfig";
import { useRouter } from "next/router";
import UserCard from "./User/Card";

const Sidebar: FC = () => {
  const router = useRouter();
  const config = useConfig();
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
      className="fixed inset-0 z-[1000] bg-white"
    >
      <div className="h-[70px] w-full flex justify-end items-center border-b pr-4">
        <FiX
          className="text-2xl cursor-pointer"
          onClick={config.sidebarClose}
        />
      </div>
      <UserCard />
      <div className="flex flex-col justify-center gap-12 py-12 px-8">
        <div className="flex flex-col gap-7 text-[26pt] leading-8">
          <div
            className={router.asPath === "/" ? "text-[#FD08FD] cursor-pointer" : "text-[#1B2C5F] cursor-pointer"}
            onClick={() => config.link(() => router.push("/"))}
          >
            Dashboard
          </div>
          <div
            className={router.asPath === "/league" ? "text-[#FD08FD] cursor-pointer" : "text-[#1B2C5F] cursor-pointer"}
            onClick={() => config.link(() => router.push("/league"))}
          >
            League
          </div>
          <div
            className={router.asPath === "/players" ? "text-[#FD08FD] cursor-pointer" : "text-[#1B2C5F] cursor-pointer"}
            onClick={() => config.link(() => router.push("/players"))}
          >
            Players
          </div>
          <div
            className={router.asPath === "/promotions" ? "text-[#FD08FD] cursor-pointer" : "text-[#1B2C5F] cursor-pointer"}
            onClick={() => config.link(() => router.push("/promotions"))}
          >
            Promotions
          </div>
        </div>
        <div className="flex flex-col gap-4 text-base leading-6">
          <div
            className={router.asPath === "/nets" ? "text-[#FD08FD] cursor-pointer" : "text-[#1B2C5F] cursor-pointer"}
            onClick={() => config.link(() => router.push("/nets"))}
          >
            About NETS
          </div>
          <div
            className={router.asPath === "/policy/tos" ? "text-[#FD08FD] cursor-pointer" : "text-[#1B2C5F] cursor-pointer"}
            onClick={() => config.link(() => router.push("/policy/tos"))}
          >
            Terms of Use
          </div>
          <div
            className={router.asPath === "/policy/privacy" ? "text-[#FD08FD] cursor-pointer" : "text-[#1B2C5F] cursor-pointer"}
            onClick={() => config.link(() => router.push("/policy/privacy"))}
          >
            Privacy Policy
          </div>
          <div
            className={router.asPath === "/policy/merchant" ? "text-[#FD08FD] cursor-pointer" : "text-[#1B2C5F] cursor-pointer"}
            onClick={() => config.link(() => router.push("/policy/merchant"))}
          >
            Merchant Policy
          </div>
        </div>
      </div>
      <div className="text-center p-4 text-gray-200 fixed bottom-0 w-full">
        © 2024. NETS League inc.
      </div>
    </motion.div>
  );
};

export default Sidebar;

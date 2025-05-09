import Image from "next/image"
import NotifIcon from "./icons/Notif"
import { RiDiscountPercentLine } from "react-icons/ri"
import { HiOutlineMenu } from "react-icons/hi"
import { FC } from "react"
import useConfig from "nets/stores/useConfig"
import { useRouter } from "next/router"

const Navbar: FC = () => {
  const router = useRouter();
  const config = useConfig();
  return (
    <section id="navbar" className="bg-[#2E55CE] text-white flex justify-between items-center py-3 px-4">
      <Image src={'/logo.webp'} title="NETS" alt="NETS" width={135} height={37} />
      <div className="flex items-center">
        <div className="relative w-10 h-10 flex justify-center items-center">
          <NotifIcon width={18} height={18} className="cursor-pointer" onClick={() => config.link(() => router.push("/notifications"))} />
        </div>
        <div className="relative w-10 h-10 flex justify-center items-center">
          <RiDiscountPercentLine fontSize={18} className="cursor-pointer" onClick={() => config.link(() => router.push("/promotions"))} />
        </div>
        <div className="relative w-10 h-10 flex justify-center items-center">
          <HiOutlineMenu fontSize={18} className="cursor-pointer" onClick={config.sidebarOpen} />
        </div>
      </div>
    </section>
  )
}

export default Navbar;
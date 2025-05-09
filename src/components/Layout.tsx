import { FC, PropsWithChildren, useEffect } from "react";
import { Poppins } from "next/font/google";
import Navbar from "nets/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import HomeIcon from "./icons/Home";
import MatchIcon from "./icons/Match";
import PlayersIcon from "./icons/Players";
import MerchIcon from "./icons/Merch";
import { AnimatePresence } from "framer-motion";
import useConfig from "nets/stores/useConfig";
import Sidebar from "./Sidebar";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "800", "900"],
});

type LayoutProps = {
  title: string;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, title }) => {
  const config = useConfig();
  useEffect(() => {
    if (config.sidebar) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [config.sidebar]);

  return (
    <main className={poppins.className}>
      <Head>
        <title>NETS League</title>
      </Head>
      <section className="block sm:hidden">
        <Navbar />
        <div className="bg-[#C6FB0F] text-[#1B2C5F] px-5 py-1.5 font-semibold text-base leading-6">
          {title}
        </div>
        {children}
        <div className="fixed bottom-0 h-16 w-full p-4 bg-white flex justify-around border-t">
          <Link href={"/"}>
            <HomeIcon />
          </Link>
          <Link href={"/matches"}>
            <MatchIcon />
          </Link>
          <Link href={"/players"}>
            <PlayersIcon />
          </Link>
          <Link href={"/promotions"}>
            <MerchIcon />
          </Link>
        </div>
      </section>
      <section className="hidden sm:flex bg-[#2E55CE] h-screen text-[#C6FB0F] inset-0 justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={"/logo.webp"}
            title="NETS"
            alt="NETS"
            width={135}
            height={37}
          />
          <div className="text-white">Please use Mobile View</div>
          <p className="text-xs">
            This website is optimized for mobile view only
          </p>
        </div>
      </section>
      <AnimatePresence>
        {config.sidebar && <Sidebar />}
      </AnimatePresence>
    </main>
  );
};

export default Layout;

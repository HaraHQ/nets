import Layout from "nets/components/Layout";
import RankComponent from "nets/components/Rank/RankComponent";
import Search, { SearchHandle } from "nets/components/Search";
import { motion } from "framer-motion";
import SmallCard from "nets/components/Rank/SmallCard";
import { useQuery } from "@tanstack/react-query";
import useConfig from "nets/stores/useConfig";
import { Player } from "nets/types";
import { useRef } from "react";
import Image from "next/image";

const PlayersPage = () => {
  const searchRef = useRef<SearchHandle>(null);
  const config = useConfig();
  useQuery({
    queryKey: ["search", config.keyword],
    queryFn: async () => {
      const rank = await fetch(`/api/search?name=${config.keyword}`, { method: "GET" });
      const resp = await rank.json();
      const players: Player[] = resp.result;
      config.setSearchResult(players);
    },
  });

  const handleClear = () => {
    config.setKeyword("")
    searchRef.current?.clearInput();
  };

  return (
    <Layout title="Players">
      <Search ref={searchRef} />
      {config.keyword !== "" ? (
        <div id="search-result" className="py-2">
          <div className="flex justify-between items-center px-2">
            <div>
              <span className="text-gray-300 text-xs">
                Search Result:{" "}
                <span className="text-gray-400 font-semibold">
                  {'"'}
                  {config.keyword}
                  {'"'}
                </span>
              </span>
            </div>
            <motion.button
              whileTap={{ y: 1 }}
              onClick={handleClear}
              className="p-2.5 rounded-lg w-[87px] text-xs bg-[#2E55CE] text-white text-center"
            >
              Clear
            </motion.button>
          </div>
          {config.searchResult.length ? (
            <div className="p-4 flex flex-col gap-2">
              {config.searchResult.map((p) => (
                <SmallCard {...p} />
              ))}
            </div>
          ) : (
            <div className="p-6 flex justify-center items-center">
              <div>
                <Image src="/info.webp" width={267} height={228} alt="INFO" />
                <div className="font-medium text-base uppercase leading-5 text-center w-full">
                  not found
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <RankComponent />
      )}
    </Layout>
  );
};

export default PlayersPage;

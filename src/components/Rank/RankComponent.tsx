import { FC, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import RankCard from './Card';
import MedCard from './MedCard';
import SmallCard from './SmallCard';
import { useQuery } from '@tanstack/react-query';
import { Player } from 'nets/types';

import 'swiper/css';

const RankComponent: FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [players, setPlayers] = useState<{
    top10: Player[];
    top20: Player[];
    top50: Player[];
  }>({
    top10: [],
    top20: [],
    top50: [],
  });

  useQuery({
    queryKey: ["rank"],
    queryFn: async () => {
      const rank = await fetch("/api/ranks", { method: "GET" });
      const resp = await rank.json();
      setPlayers(resp);
    }
  })

  return (
    <section id="rank" className="w-full bg-white pb-16">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView="auto"
        spaceBetween={12}
        modules={[Pagination]}
        className="pb-6"
      >
        {players.top10.map((player) => (
          <SwiperSlide
            key={player.id}
            className="!w-[350px] h-[385px] overflow-hidden shadow"
          >
            <RankCard {...player} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center gap-2 mt-2">
        {players.top10.map((_, index) => (
          <button
            key={index}
            className={`w-7 h-7 rounded text-sm font-semibold flex items-center justify-center ${
              index === activeIndex
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            }`}
            onClick={() => swiperRef.current?.slideTo(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-3">
        {players.top20.map((player) => (
          <MedCard key={player.id} {...player} />
        ))}
      </div>

      <div className="p-4 space-y-3">
        {players.top50.map((player) => (
          <SmallCard key={player.id} {...player} />
        ))}
      </div>
    </section>
  );
};

export default RankComponent;

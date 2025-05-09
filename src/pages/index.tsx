import Layout from "nets/components/Layout";
import LeagueSlideCard from "nets/components/League/SlideCard";
import UserCard from "nets/components/User/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { League, Matches } from "nets/types";
import JoinedCard from "nets/components/League/JoinedCard";
import MatchCard from "nets/components/League/MatchCard";

// start from 22.40
const IndexPage = () => {
  const [league, setLeague] = useState<League[]>([]);
  const [journey, setJourney] = useState<League[]>([]);
  const [upcoming, setUpcoming] = useState<Matches[]>([]);
  useQuery({
    queryKey: ["league"],
    queryFn: async () => {
      const req = await fetch("/api/leagues", { method: "GET" });
      const res = await req.json();

      const result = res.league || [];
      setLeague(result);
    },
  });
  useQuery({
    queryKey: ["joined"],
    queryFn: async () => {
      const req = await fetch("/api/my-journey", { method: "GET" });
      const res = await req.json();

      const result = res.league || [];
      setJourney(result);
    },
  });
  useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const req = await fetch("/api/upcoming", { method: "GET" });
      const res = await req.json();

      const result = res.matches || [];

      setUpcoming(result);
    },
  });
  return (
    <Layout title="Dashboard">
      <UserCard />
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        modules={[Pagination]}
        pagination={{
          el: ".league-swiper-pagination",
          clickable: true,
        }}
        className="pb-6 nets-league-card"
      >
        {league.map((l) => (
          <SwiperSlide key={l.id}>
            <LeagueSlideCard {...l} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="league-swiper-pagination mt-2 flex gap-2 justify-center z-[500]" />

      <div className="p-4 flex flex-col gap-6 pb-24">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-normal leading-5">Joined League</div>
          {journey.map((j) => (
            <JoinedCard key={j.id} {...j} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm font-normal leading-5">Upcoming Match</div>
          {upcoming.map((u, idx) => (
            // yang ini tech debt ya... soalnya 40 menit lagi saya mau deploy
            <MatchCard
              key={u[idx].id}
              id={u[idx].id}
              mode={u[idx].mode}
              players={u[idx].players}
              score={u[idx].score}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

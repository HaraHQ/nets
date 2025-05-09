import { Player } from 'nets/types';
import { create } from 'zustand';

type ConfigState = {
  sidebar: boolean;
  sidebarOpen: () => void;
  sidebarClose: () => void;
  link: (cb: () => void) => void;
  keyword: string;
  setKeyword: (val: string) => void;
  searchResult: Player[];
  setSearchResult: (players: Player[]) => void;
};

const useConfig = create<ConfigState>((set) => ({
  sidebar: false,
  sidebarOpen: () => set({ sidebar: true }),
  sidebarClose: () => set({ sidebar: false }),
  link: (cb) => {
    set({ sidebar: false });
    cb();
  },
  keyword: "",
  setKeyword: (val) => set({ keyword: val }),
  searchResult: [],
  setSearchResult: (players) => set({ searchResult: players })
}));

export default useConfig;

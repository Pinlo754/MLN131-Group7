import { create } from 'zustand';

export type PageType = 'history' | 'chat';

interface NavStore {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  currentPage: 'history',
  setCurrentPage: (page: PageType) => set({ currentPage: page }),
}));

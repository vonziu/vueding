import {GetterTree, Module, MutationTree} from 'vuex';
import {RootState, SidebarState} from '@/store/types';

const sidebarState: SidebarState = {
  isOpen: false,
  currentWidth: null,
};

const mutations: MutationTree<SidebarState> = {
  setSidebarState(state: SidebarState, isOpen: boolean) {
    state.isOpen = isOpen;
  },
  setCurrentWidth(state: SidebarState, currentWidth: number) {
    state.currentWidth = currentWidth;
  },
};

const getters: GetterTree<SidebarState, RootState> = {
  getSidebarState: (state): boolean => state.isOpen,
  getCurrentWidth: (state): number | null => state.currentWidth,
};

export const sidebar: Module<SidebarState, RootState> = {
  state: sidebarState,
  mutations,
  getters,
  namespaced: true,
};

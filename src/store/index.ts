import Vue from 'vue';
import Vuex from 'vuex';
import {User} from '@/common/types';
import {sidebar} from './modules/sidebar.module';
import {RootState} from '@/store/types';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    user: null,
  },
  mutations: {
    setUser(state: RootState, user: User | null) {
      state.user = user;
    },
  },
  actions: {},
  getters: {
    getUser: (state): User | null => state.user,
  },
  modules: {
    sidebar,
  },
});

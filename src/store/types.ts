import {User} from '@/common/model/firebase.types';

export interface RootState {
  user: User | null;
}

export interface SidebarState {
  isOpen: boolean,
  currentWidth: number | null,
}

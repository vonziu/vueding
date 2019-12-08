import {User} from '@/common/types';

export interface RootState {
  user: User | null;
}

export interface SidebarState {
  isOpen: boolean,
  currentWidth: number | null,
}

import { createContext } from 'react';

export type SidebarValues = {
  open: boolean;
  toggleSidebar: (open: boolean) => void;
};

export const defaultValue: SidebarValues = { open: false, toggleSidebar: (): void => {} };
export const SidebarContext = createContext<SidebarValues>(defaultValue);

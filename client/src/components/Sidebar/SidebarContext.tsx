import { createContext } from 'react';

export const defaultValue = { open: false, toggleSidebar: (open: boolean): void => {} };
export const SidebarContext = createContext<{ open: boolean; toggleSidebar: (open: boolean) => void }>(defaultValue);

import { createContext } from 'react';

export const defaultValue = { open: false, toggleModal: (open: boolean): void => {} };
export const ModalContext = createContext<{ open: boolean; toggleModal: (open: boolean) => void }>(defaultValue);

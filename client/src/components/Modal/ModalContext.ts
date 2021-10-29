import { createContext } from 'react';

export interface ModalValues {
  open: boolean;
  toggleModal: (open: boolean) => void;
}

export const defaultValue: ModalValues = { open: false, toggleModal: (): void => {} };
export const ModalContext = createContext<ModalValues>(defaultValue);

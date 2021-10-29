import React, { PropsWithChildren, ReactElement } from 'react';
import { ModalContext } from './ModalContext';

const ModalProvider = ({ children }: PropsWithChildren<{}>): ReactElement => {
  const [open, toggleModal] = React.useState(false);

  return <ModalContext.Provider value={{ open: open, toggleModal: toggleModal }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;

import React, { PropsWithChildren } from 'react';
import { ModalContext } from './ModalContext';

function ModalProvider(props: PropsWithChildren<{}>) {
  const [open, toggleModal] = React.useState(false);

  return <ModalContext.Provider value={{ open: open, toggleModal: toggleModal }}>{props.children}</ModalContext.Provider>;
}

export default ModalProvider;
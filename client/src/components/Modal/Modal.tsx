import React, { useContext } from 'react';
import { Dialog } from '@mui/material';
import { ModalContext } from './ModalContext';

const ModalActually = () => {
  const context = useContext(ModalContext);

  return (
    <Dialog open={context.open} onClose={(): void => context.toggleModal(false)}>
      test here
    </Dialog>
  );
};

export default ModalActually;

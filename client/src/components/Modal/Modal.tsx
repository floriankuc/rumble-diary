import React, { ReactElement } from 'react';
import { Dialog } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import { APP_ROUTES } from '../../routes';

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      padding: 20,
      width: 600,
    },
  },
});

interface ModalProps {
  component: ReactElement;
}

const Modal = ({ component }: ModalProps): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const handleClose = (): void => history.push(APP_ROUTES.root);

  return (
    <Dialog open onClose={handleClose} className={classes.root}>
      {component}
    </Dialog>
  );
};

export default Modal;

import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { PropsWithChildren, ReactElement } from 'react';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/system';

interface MainLayoutStyleProps {
  match: boolean;
}

const useStyles = makeStyles<Theme, MainLayoutStyleProps>({
  mainLayout: {
    display: 'flex',
    flexDirection: 'column',
    padding: ({ match }): string | number => (match ? '12px 0px' : '80px 0px'),
    alignItems: 'center',
  },
});

const MainLayout = ({ children }: PropsWithChildren<{}>): ReactElement => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ match });

  return <section className={classes.mainLayout}>{children}</section>;
};

export default MainLayout;

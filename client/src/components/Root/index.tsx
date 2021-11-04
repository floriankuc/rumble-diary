import React, { ReactElement } from 'react';
import { Theme, Typography } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 12px',
    minWidth: 300,
    maxWidth: 600,
  },
  icon: {
    width: '100%',
    height: '100%',
    color: theme.colors.primary,
    alignSelf: 'center',
  },
  rootHeadline: {
    fontWeight: 400,
    fontSize: '2rem',
    letterSpacing: -2,
  },
  appTitle: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '3rem',
    letterSpacing: -4,
  },
}));

const Root = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <Typography component="h1" className={classes.appTitle}>
        <FormattedMessage id="app.title" />
      </Typography>
      <HotelIcon className={classes.icon} />
      <Typography className={classes.rootHeadline} sx={{ mt: 6 }}>
        <FormattedMessage id="home.headline1" />
      </Typography>
      <Typography>
        <FormattedMessage id="home.body1" />
      </Typography>
      <Typography className={classes.rootHeadline} sx={{ mt: 4 }}>
        <FormattedMessage id="home.headline2" />
      </Typography>
      <Typography>
        <FormattedMessage id="home.body2" />
      </Typography>
      <Typography sx={{ mt: 2 }}>
        <FormattedMessage id="home.body3" />
      </Typography>
    </div>
  );
};
export default Root;

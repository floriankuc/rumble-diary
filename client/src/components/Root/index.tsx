import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import { FormattedMessage } from 'react-intl';

const Root = (): ReactElement => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      <Typography component="h1" sx={{ textAlign: 'center', fontWeight: 400, fontSize: '3rem', letterSpacing: -4 }}>
        <FormattedMessage id="app.title" />
      </Typography>
      <HotelIcon sx={{ width: 500, height: 500, color: '#1976d2', alignSelf: 'center' }} />
      <Typography sx={{ fontWeight: 400, fontSize: '2rem', letterSpacing: -2, mt: 6 }}>What is this?</Typography>
      <Typography>
        <FormattedMessage id="home.body1" />
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: '2rem', letterSpacing: -2, mt: 4 }}>Why is this useful?</Typography>
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

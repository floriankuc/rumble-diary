import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';

const Root = (): ReactElement => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      <Typography component="h1" sx={{ textAlign: 'center', fontWeight: 400, fontSize: '3rem', letterSpacing: -4 }}>
        Sleep Diary
      </Typography>
      <HotelIcon sx={{ width: 500, height: 500, color: '#1976d2', alignSelf: 'center' }} />
      <Typography sx={{ fontWeight: 400, fontSize: '2rem', letterSpacing: -2, mt: 6 }}>What is this?</Typography>
      <Typography>
        It's a diary to document your sleep. All commonly known parameters of sleep hygiene are covered. Additionally it is used to document the sleep duration
        itself by date.
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: '2rem', letterSpacing: -2, mt: 4 }}>Why is this useful?</Typography>
      <Typography>
        There are a number of reasons why one would document their sleep. One might suffer from either insomnia, light or little sleep, have trouble falling
        asleep or be prone to interruptions during the night.
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Sleep quality is determined by multiple variables. Getting to the bottom of sleeping problems requires examining the sleep environment, sleep hygiene
        and being mindful of your own condition. This app provides some overall support in serving as a diary for the afore-mentioned parameters and conditions.
      </Typography>
    </div>
  );
};

export default Root;

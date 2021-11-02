import { Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

export const NotFound404 = (): ReactElement => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h1">
      <FormattedMessage id={'404.headline'} />
    </Typography>
    <Typography variant="h3">
      <FormattedMessage id={'404.body'} />
    </Typography>
  </div>
);

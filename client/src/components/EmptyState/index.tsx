import { Button, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { APP_ROUTES } from '../../routes';
import history from '../../routes/history';

const EmptyState = (): ReactElement => {
  const navigateToAdd = (): void => history.push(APP_ROUTES.add);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2">
        <FormattedMessage id="emptyState.headline" />
      </Typography>
      <Typography>
        <FormattedMessage id="emptyState.body" />
      </Typography>
      <Button variant="contained" sx={{ mt: 5 }} onClick={navigateToAdd}>
        <FormattedMessage id="emptyState.btn" />
      </Button>
    </div>
  );
};

export default EmptyState;

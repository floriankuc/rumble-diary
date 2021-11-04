import { Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { TooltipProps } from 'recharts';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme: Theme) => ({
  tooltip: {
    padding: 10,
    background: theme.colors.bar,
  },
}));

export const ChartTooltip = ({ active, payload }: TooltipProps): ReactElement => {
  const classes = useStyles();

  if (active && payload && payload[0] && payload[0].payload.date) {
    return (
      <div className={classes.tooltip}>
        <Typography>{format(new Date(payload[0].payload.date), 'dd.MM.yyyy')}</Typography>
        <Typography>
          <FormattedMessage id="chart.tooltip.duration" values={{ hours: payload[0].value }} />
        </Typography>
      </div>
    );
  }
  return <></>;
};

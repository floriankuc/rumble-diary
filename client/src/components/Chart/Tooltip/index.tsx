import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { TooltipProps } from 'recharts';

const useStyles = makeStyles({
  tooltip: {
    padding: 10,
    background: '#FFF9',
  },
});

export const ChartTooltip = ({ active, payload }: TooltipProps): ReactElement | null => {
  const classes = useStyles();
  if (active && payload && payload[0] && payload[0].payload.date) {
    return (
      <div className={classes.tooltip}>
        <Typography>{format(new Date(payload[0].payload.date), 'dd.MM.yyyy')}</Typography>
        <Typography>{`${payload[0].value} hours`}</Typography>
      </div>
    );
  }

  return null;
};

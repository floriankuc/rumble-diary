import { Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { TooltipProps } from 'recharts';
import { FormattedMessage } from 'react-intl';
import { capitalise, spacePascalCase } from '../../../helpers/common';
import { EntryPayload } from '..';

const useStyles = makeStyles({
  emptyTooltip: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  date: {
    marginBottom: 12,
  },
});

export const ChartTooltip = ({ active, payload }: TooltipProps): ReactElement => {
  const classes = useStyles();

  const renderPayloadDate = (entryPayload: EntryPayload): ReactElement => (
    <Typography className={classes.date} key={entryPayload._id}>
      {format(new Date(entryPayload.date), 'dd.MM.yyyy')}
    </Typography>
  );

  const renderProblems = ({ problemsWithNames, _id }: EntryPayload): ReactElement[] =>
    problemsWithNames.map((p) => <Typography key={_id + p}>{spacePascalCase(capitalise(p))}</Typography>);

  const renderNoProblems = (): ReactElement => (
    <div className={classes.emptyTooltip}>
      🎉
      <Typography>
        <FormattedMessage id="chart.bar.noProblems" />
      </Typography>
    </div>
  );

  if (active && payload && payload[0] && payload[0].payload) {
    const entryPayload: EntryPayload = payload[0].payload;

    return (
      <Paper sx={{ p: 1 }} elevation={8}>
        {renderPayloadDate(entryPayload)}
        {entryPayload.problems > 0 ? renderProblems(entryPayload) : renderNoProblems()}
      </Paper>
    );
  }
  return <></>;
};

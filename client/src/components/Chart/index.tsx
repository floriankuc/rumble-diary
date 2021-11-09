import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Cell, ResponsiveContainer, Tooltip, TooltipPayload, XAxis, YAxis } from 'recharts';
import { theme } from '../../styles/theme';
import { ChartTooltip } from './Tooltip';

const useStyles = makeStyles({
  chartWrapper: {
    width: '80%',
    minWidth: 500,
    height: 300,
  },
});

const colourFillsPerProblem: { [key: number]: string } = {
  0: theme.colors.bar1,
  1: theme.colors.bar2,
  2: theme.colors.bar3,
  3: theme.colors.bar4,
  4: theme.colors.bar5,
  5: theme.colors.bar6,
  6: theme.colors.bar7,
};

export interface ChartProps {
  readonly data: EntryPayload[];
  readonly onBarClick: (id: string) => void;
}

export interface EntryPayload extends Omit<TooltipPayload, 'name' | 'value'> {
  _id: string;
  date: Date;
  problems: number;
  problemsWithNames: string[];
}

const Chart = ({ data, onBarClick }: ChartProps): ReactElement => {
  const classes = useStyles();

  const renderProblemCell = (payload: EntryPayload): ReactElement => {
    return <Cell key={`cell-${payload._id}`} onClick={(): void => onBarClick(payload._id)} fill={colourFillsPerProblem[payload.problems]} />;
  };
  const renderNoProblemCell = (payload: EntryPayload): ReactElement => {
    return <Cell key={`cell-${payload._id}`} onClick={(): void => onBarClick(payload._id)} height={-28} fill={colourFillsPerProblem[0]} />;
  };

  return (
    <div className={classes.chartWrapper}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(): string => ''} tickLine={false} />
          <YAxis type="number" domain={[0, 6]} />
          <Tooltip content={<ChartTooltip />} />
          <Brush dataKey="date" tickFormatter={(val: string): string => format(new Date(val), 'dd.MM.yyyy')} />
          <Bar dataKey="problems">{data.map((entry) => (entry.problems === 0 ? renderNoProblemCell(entry) : renderProblemCell(entry)))}</Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

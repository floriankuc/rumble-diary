import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Night } from '../../entities/Night';
import { ChartTooltip } from './Tooltip';

const useStyles = makeStyles({
  chartWrapper: {
    width: '80%',
    minWidth: 500,
    height: 300,
  },
});
export interface ChartProps {
  readonly data: Night[];
  readonly onBarClick: (id: string) => void;
}

const Chart = ({ data, onBarClick }: ChartProps): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.chartWrapper}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="duration" tickFormatter={() => ''} tickLine={false} />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Brush dataKey="date" tickFormatter={(val) => format(new Date(val), 'dd.MM.yyyy')} />
          <Bar dataKey="duration">
            {data.map((entry: Night, index: number) =>
              entry.duration === 0 ? (
                <Cell key={`cell-${index}`} onClick={(): void => onBarClick(entry._id)} height={-40} fill="#EEE" />
              ) : (
                <Cell key={`cell-${index}`} onClick={(): void => onBarClick(entry._id)} fill="#8884d8" />
              )
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

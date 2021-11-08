import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Entry } from '../../entities/Night';
import { ChartTooltip } from './Tooltip';

const useStyles = makeStyles({
  chartWrapper: {
    width: '80%',
    minWidth: 500,
    height: 300,
  },
});
export interface ChartProps {
  readonly data: any[];
  readonly onBarClick: (id: string) => void;
}

const Chart = ({ data, onBarClick }: ChartProps): ReactElement => {
  const classes = useStyles();
  console.log('chartdata', data);
  return (
    <div className={classes.chartWrapper}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(): string => ''} tickLine={false} />
          <YAxis type="number" domain={[0, 6]} />
          <Tooltip content={<ChartTooltip />} />
          {/* <Tooltip /> */}
          <Brush dataKey="date" tickFormatter={(val): string => format(new Date(val), 'dd.MM.yyyy')} />
          <Bar dataKey="problems" />
          {/* <Bar dataKey="o.nausea" stackId="a" fill="#8884d8" />
          <Bar dataKey="o.bloating" stackId="a" fill="#82ca9d" />
          <Bar dataKey="o.flatulence" stackId="a" fill="#823154" />
          <Bar dataKey="o.diarrhoea" stackId="a" fill="#123679" />
          <Bar dataKey="o.diffusePain" stackId="a" fill="#ccca4d" /> */}
          {/* {data.map((entry: Entry) => {
              return entry === 0 ? (
                <Cell key={`cell-${entry._id}`} onClick={(): void => onBarClick(entry._id)} height={-40} fill="#EEE" />
              ) : (
                <Cell key={`cell-${entry._id}`} onClick={(): void => onBarClick(entry._id)} fill="#8884d8" />
              );
            }
            )} */}
          {/* </Bar> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

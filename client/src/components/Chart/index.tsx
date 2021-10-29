import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Cell, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { Night } from '../../entities/Night';

const useStyles = makeStyles({
  tooltip: {
    padding: 10,
    background: '#FFF9',
  },
});
export interface ChartProps {
  readonly data: Night[];
  readonly onBarClick: (id: string) => void;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
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

const Chart = ({ data, onBarClick }: ChartProps): ReactElement => {
  return (
    <BarChart width={300} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="duration" tickFormatter={() => ''} tickLine={false} />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Brush
        dataKey="date"
        //  x={80} width={200}
        tickFormatter={(val) => format(new Date(val), 'dd.MM.yyyy')}
      />
      <Bar dataKey="duration">
        {data.map((entry: Night, index: number) =>
          entry.duration === 0 ? (
            <Cell key={`cell-${index}`} onClick={(item): void => onBarClick(entry._id)} height={-40} fill="#EEE" />
          ) : (
            <Cell key={`cell-${index}`} onClick={(item): void => onBarClick(entry._id)} fill="#8884d8" />
          )
        )}
      </Bar>
    </BarChart>
  );
};

export default Chart;

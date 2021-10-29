import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import { Night } from '../../entities/Night';
import { ChartTooltip } from './Tooltip';

export interface ChartProps {
  readonly data: Night[];
  readonly onBarClick: (id: string) => void;
}

const Chart = ({ data, onBarClick }: ChartProps): ReactElement => {
  return (
    <BarChart width={300} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="duration" tickFormatter={() => ''} tickLine={false} />
      <YAxis />
      <Tooltip content={<ChartTooltip />} />
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

import React, { ReactElement } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export interface ChartProps {
  data: any;
  onBarClick: (id: any) => void;
}

const Chart = ({ data, onBarClick }: ChartProps): ReactElement => (
  <BarChart width={400} height={400} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="duration" />
    <YAxis />
    <Tooltip />
    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
    <Brush dataKey="date" height={30} stroke="#8884d8" />
    <Bar dataKey="duration" fill="#8884d8" onClick={(item): void => onBarClick(item._id)} />
  </BarChart>
);

export default Chart;

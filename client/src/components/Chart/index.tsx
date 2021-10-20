import React, { useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Brush, Tooltip, ReferenceLine } from 'recharts';

export interface ChartProps {
  data: any;
  onBarClick: (id: any) => void;
}

const Chart = (props: ChartProps) => {
  return (
    <BarChart width={400} height={400} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="duration" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <Brush dataKey="date" height={30} stroke="#8884d8" />
      <Bar dataKey="duration" fill="#8884d8" onClick={(item): void => props.onBarClick(item._id)} />
    </BarChart>
  );
};

export default Chart;

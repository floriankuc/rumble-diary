import React, { ReactElement } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from 'recharts';
export interface ChartProps {
  data: any;
  onBarClick: (id: any) => void;
}

function CustomLabel({ x, y, stroke, value, width }: any) {
  if (value) {
    return null;
  }

  return (
    <text x={x} y={y} dy={-20} dx={width / 2} textAnchor="middle" fill="#888">
      Sleepless
    </text>
  );
}

const Chart = ({ data, onBarClick }: ChartProps): ReactElement => (
  <BarChart width={400} height={400} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="duration" />
    <YAxis />
    <Tooltip />
    {/* <Legend verticalAlign="top" margin={{ top: -100, left: -100 }} wrapperStyle={{ lineHeight: '40px' }} /> */}
    <Brush dataKey="date" height={30} stroke="#8884d8" />
    <Bar dataKey="duration" label={<CustomLabel />}>
      {data.map((entry: any, index: number) =>
        entry.duration === 0 ? (
          <Cell
            key={`cell-${index}`}
            onClick={(item): void => onBarClick(entry._id)}
            height={-50}
            // stroke={'#999'}
            fill="#eee"
            // strokeWidth={1}
            // strokeDasharray="10 3"
          />
        ) : (
          <Cell key={`cell-${index}`} onClick={(item): void => onBarClick(entry._id)} />
        )
      )}
    </Bar>
  </BarChart>
);

export default Chart;

import React, { ReactElement } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
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
      X
    </text>
  );
}

const CustomTick = (props: any) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        // fill="#666"
        // transform="rotate(-35)"
      >
        {Math.floor(payload.value)}
      </text>
    </g>
  );
};

const Chart = ({ data, onBarClick }: ChartProps): ReactElement => (
  <BarChart width={400} height={400} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="duration" />
    <YAxis />
    <Tooltip />
    <Brush dataKey="date" height={30} stroke="#8884d8" />
    <Bar dataKey="duration" label={<CustomLabel />}>
      {data.map((entry: any, index: number) =>
        entry.duration === 0 ? (
          <Cell key={`cell-${index}`} onClick={(item): void => onBarClick(entry._id)} height={-50} fill="#eee" />
        ) : (
          <Cell key={`cell-${index}`} onClick={(item): void => onBarClick(entry._id)} />
        )
      )}
    </Bar>
  </BarChart>
);

export default Chart;

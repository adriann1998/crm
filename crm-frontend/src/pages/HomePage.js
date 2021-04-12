import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function HomePage ( ) {
  const data = [
    {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 200, pv: 2400, amt: 2400},
    {name: 'Page C', uv: 600, pv: 2400, amt: 2400}
  ];

  return (
    <LineChart width={1000} height={800} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  )
};

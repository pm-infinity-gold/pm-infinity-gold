"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {

  history: any[];
}

export default function SavingsChart({
  history,
}: Props) {

  const chartData =
    [...history]

      .reverse()

      .map((item, index) => {

        return {

          name:
            index + 1,

          amount:
            item.amount,
        };
      });

  return (

    <div className="bg-gray-900 p-5 rounded-2xl border border-yellow-500/10">

      <p className="text-yellow-500 font-semibold mb-5">

        Savings Growth Analytics

      </p>

      <div className="w-full h-64">

        <ResponsiveContainer width="100%" height={300}>
        

          <LineChart
            data={chartData}
          >

            <XAxis
              dataKey="name"
              stroke="#888"
            />

            <YAxis
              stroke="#888"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#eab308"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

export type DailyTemp = {
  date: number;
  temperate: number;
};

interface Props {
  dailyTemps: DailyTemp[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const TemperatureChart: React.FC<Props> = ({ dailyTemps }: Props) => {
  const labels = useMemo(
    () => dailyTemps.map((v) => dayjs.unix(v.date).format('h a')),
    [dailyTemps],
  );

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Temperature',
          data: dailyTemps.map((v) => v.temperate),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  }, [dailyTemps]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Line options={options as unknown as any} data={data} />;
};

export default TemperatureChart;

import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import getFutureForecast from '../../api/getFutureForecast';
import { List } from '../../modals/api/futureForecast';
import { Mode, Units } from '../../modals/generic';
import TemperatureChart, { DailyTemp } from './tempChart';

interface Props {
  lat: number;
  lon: number;
}

const currentDate = dayjs(new Date()).format('MM/DD/YYYY');

const FutureForecast: React.FC<Props> = ({ lat, lon }: Props) => {
  const [forecast, setForecast] = useState<Record<string, List[]>>();

  console.log(forecast);

  const handleFetch = useCallback(async () => {
    if (!lat || !lon) return;

    const object: Record<string, List[]> = {};

    const data = await getFutureForecast({
      lat,
      lon,
      units: Units.imperial,
      mode: Mode.JSON,
    });

    data.list.forEach((v) => {
      const date = dayjs.unix(v.dt).format('MM/DD/YYYY');

      if (!object[date]) {
        object[date] = [v];
      } else {
        object[date].push(v);
      }
    });

    setForecast(object);
  }, [lat, lon]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <div className="flex flex-wrap gap-2 justify-center text-center">
      {forecast &&
        Object.keys(forecast).map((key) => {
          const dailyTemps: DailyTemp[] = forecast[key].map((v) => ({
            date: v.dt,
            temperate: v.main.temp,
          }));

          const isCurrentDate = key === currentDate;

          return (
            <div
              className={twMerge(
                'border flex flex-col',
                isCurrentDate && 'border-red-500',
              )}
            >
              <h3 className=" font-semibold text-lg text-gray-900">
                {dayjs(key).format('dddd')}
              </h3>
              <span>{dayjs(key).format('dddd, MMMM D, YYYY')}</span>
              <TemperatureChart dailyTemps={dailyTemps} />
              {/* <span>{weather[0].description}</span> */}
            </div>
          );
        })}
    </div>
  );
};

export default FutureForecast;

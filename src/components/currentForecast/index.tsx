import React, { useCallback, useEffect, useState } from 'react';
import getCurrentForecast from '../../api/getCurrentForecast';
import { Mode, Units } from '../../modals/generic';
import { CurrentForecastResponse } from '../../modals/api/currentForecast';
import LoadingSpinner from '../spinner';

interface Props {
  lat: number;
  lon: number;
}

const CurrentForecast: React.FC<Props> = ({ lat, lon }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentForecast, setCurrentForecast] =
    useState<CurrentForecastResponse>();

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    const data = await getCurrentForecast({
      lat,
      lon,
      units: Units.imperial,
      mode: Mode.JSON,
    });

    setCurrentForecast(data);
    setIsLoading(false);
  }, [lat, lon]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  if (!currentForecast && !isLoading) return null;

  if (!currentForecast && isLoading) {
    return <LoadingSpinner />;
  }

  if (currentForecast) {
    const { main, name, weather } = currentForecast;

    return (
      <div className="space-y-1 text-center">
        <h1 className="font-semibold text-xl">My Location</h1>
        <span>{name}</span>
        <h2 className="font-bold text-4xl">{Math.round(main.temp)}°</h2>
        <span>{weather[0].main}</span>
        <div className=" space-x-2">
          <span>H:{Math.round(main.temp_max)}°</span>
          <span>L:{Math.round(main.temp_min)}°</span>
        </div>
      </div>
    );
  }

  return null;
};

export default CurrentForecast;

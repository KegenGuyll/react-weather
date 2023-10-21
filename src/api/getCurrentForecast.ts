import { CurrentForecastResponse } from '../modals/api/currentForecast';
import { ForecastParams } from '../modals/generic';

const getCurrentForecast = async ({
  lat,
  lon,
  units,
  mode,
}: ForecastParams): Promise<CurrentForecastResponse> => {
  const appID = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  // create url based on the parameters
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&mode=${mode}&appid=${appID}`;

  // fetch the data
  const response = await fetch(url);

  // format data
  const data = await response.json();

  // return data
  return data;
};

export default getCurrentForecast;

import { FutureForecastResponse } from '../modals/api/futureForecast';
import { ForecastParams } from '../modals/generic';

const getFutureForecast = async ({
  lat,
  lon,
  units,
  mode,
}: ForecastParams): Promise<FutureForecastResponse> => {
  const appID = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  // create url based on the parameters
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&mode=${mode}&appid=${appID}`;

  // fetch the data
  const response = await fetch(url);

  // format data
  const data = await response.json();

  // return data
  return data;
};

export default getFutureForecast;

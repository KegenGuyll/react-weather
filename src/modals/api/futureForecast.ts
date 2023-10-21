/* eslint-disable no-use-before-define */
export interface FutureForecastResponse {
  city: City;
  cnt: number;
  cod: string;
  list: List[];
  message: number;
}

export interface City {
  coord: Coord;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface List {
  clouds: Clouds;
  dt: number;
  dt_txt: Date;
  main: Main;
  pop: number;
  rain?: Rain;
  sys: Sys;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}

export interface Clouds {
  all: number;
}

export interface Main {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

export interface Rain {
  '3h': number;
}

export interface Sys {
  pod: string;
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Wind {
  deg: number;
  gust: number;
  speed: number;
}

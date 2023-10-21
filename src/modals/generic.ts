/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
enum Units {
  imperial = 'imperial',
  metric = 'metric',
  standard = 'standard',
}

enum Mode {
  JSON = 'JSON',
  XML = 'XML',
}

type ForecastParams = {
  lat: number;
  lon: number;
  mode?: Mode;
  units?: Units;
};

export type { ForecastParams };

export { Units, Mode };

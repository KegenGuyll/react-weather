import React, { useEffect, useState } from 'react';
import FutureForecast from './components/futureForecast';
import CurrentForecast from './components/currentForecast';

function App() {
  const [lat, setLat] = useState<number>();
  const [lon, setLon] = useState<number>();

  // eslint-disable-next-line no-undef
  const locationSuccess = (geolocation: GeolocationPosition) => {
    const { latitude, longitude } = geolocation.coords;
    setLat(latitude);
    setLon(longitude);
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  if (!lat || !lon) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-2 my-8">
      <CurrentForecast lat={lat} lon={lon} />
      <FutureForecast lat={lat} lon={lon} />
    </div>
  );
}

export default App;

/** @format */

import { useState, useEffect } from 'react';

export default function useLocation() {
  const [position, setPosition] = useState(null);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      pos => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => setErrors(err.message),
    );
  }, []);

  return [position, errors];
}

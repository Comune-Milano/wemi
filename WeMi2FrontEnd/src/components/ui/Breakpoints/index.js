/** @format */

import { useState, useEffect } from 'react';

const WindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () =>{
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return width
}

export default WindowSize;
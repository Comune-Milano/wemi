import { useState, useEffect } from 'react';
import debounce from 'utils/functions/debounce';
import breakpoints from 'utils/breakpoints';

const DEFAULT_DELAY = 200;


const useWindowSize = (delay) => {
  function getBreakPoint() {
    const size = window.innerWidth;
    if (size < breakpoints.sm) {
      return 'xs';
    }
    if (size < breakpoints.md) {
      return 'sm';
    }
    if (size < breakpoints.lg) {
      return 'md';
    }
    if (size < breakpoints.xl) {
      return 'lg';
    }
    if (size < breakpoints.xxl) {
      return 'xl';
    }
    if (size < breakpoints.xxxl) {
      return 'xxl';
    }
    return 'xxxl';
  }

  const [breakpoint, setBreakpoint] = useState(getBreakPoint);

  useEffect(() => {
    const efficientGetBreakPoint = debounce(() => {
      const newBreakPoint = getBreakPoint();
      if (newBreakPoint !== breakpoint) {
        setBreakpoint(newBreakPoint);
      }
    }, delay || DEFAULT_DELAY);

    window.addEventListener('resize', efficientGetBreakPoint);
    return () => window.removeEventListener('resize', efficientGetBreakPoint);
  }, [breakpoint]);
  return breakpoint;
};

export default useWindowSize;

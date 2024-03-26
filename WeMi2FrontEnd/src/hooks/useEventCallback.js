import React, { useLayoutEffect } from 'react';

export const useEventCallback = (fn) => {
  const ref = React.useRef(fn);

  // we copy a ref to the callback scoped to the current state/props on each render
  useLayoutEffect(() => {
    ref.current = fn;
  });

  return React.useCallback(
    (...args) => ref.current.apply(0, args),
    []
  );
};

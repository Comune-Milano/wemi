
import { useEffect, useRef } from 'react';

/**
 * Runs a side effect when the provided dependency changes.
 * @param {*} dependency
 * @param {*} sideEffect
 */
export const useDepChange = (sideEffect, dependency) => {
  // A ref to skip the first change of the provided dependency.
  const isFirstDepChange = useRef(true);

  useEffect(
    () => {
      if (isFirstDepChange.current) {
        isFirstDepChange.current = false;
        return;
      }
      sideEffect(dependency);
    },
    [dependency]
  );
};

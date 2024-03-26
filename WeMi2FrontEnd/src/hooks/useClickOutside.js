
import { useEffect, useRef } from 'react';

/**
 * A utility hook helping to deal with the click ouside of an element.
 * @param {*} elementRef
 * @param {*} handler
 */
export const useClickOutside = handler => {
  const elementRef = useRef();

  /**
   * Handles the click outside of the provided ref.
   * @param {*} event
   */
  const handleClickOutside = event => {
    if (!elementRef.current) {
      return;
    }
    if (elementRef.current.contains(event.target)) {
      return;
    }
    handler(event);
  };

  /**
   * Registers event listeners.
   */
  const registerListeners = () => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
  };

  /**
   * Deregisters event listeners.
   */
  const deregisterListeners = () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('touchstart', handleClickOutside);
  };

  /**
   * Setups the click-outside listener when the component is mounted.
   */
  useEffect(
    () => {
      deregisterListeners();
      registerListeners();

      return () => {
        deregisterListeners();
      };
    },
    [handler]
  );

  return [elementRef];
};

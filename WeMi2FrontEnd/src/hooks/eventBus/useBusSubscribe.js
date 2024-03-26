
import { useEffect, useRef, useCallback } from 'react';
import { useEventBus } from './useEventBus';

export const useBusSubscribe = (eventName, handler, skipSubscription = false) => {
  // The event bus.
  const eventBus = useEventBus();

  // A ref to unsubscribe from the event. It helps to avoid
  // registering the same event handler multiple times.
  const unsubscribeRef = useRef();

  /**
   * Detach the handler for the event.
   */
  const unsubscribe = useCallback(
    () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    },
    []
  );

  // Setup the event handler.
  useEffect(
    () => {
      if (skipSubscription) {
        return;
      }
      // Unsubscribe the previous event handler.
      unsubscribe();
      // Subscribe to the event and keep track of the subscription.
      unsubscribeRef.current = eventBus.subscribe(eventName, handler);
    },
    [handler, skipSubscription]
  );

  useEffect(
    () => () => {
      // Cleanup.
      unsubscribe();
    },
    []
  );
};

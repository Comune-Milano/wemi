import React from 'react';
import { useEventBus } from "hooks/eventBus/useEventBus";

export const withEventBus = Component => {
  return props => {
    const eventBus = useEventBus();

    return <Component eventBus={eventBus} {...props} />;
  };
};

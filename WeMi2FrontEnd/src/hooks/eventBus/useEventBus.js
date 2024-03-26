
import { useContext } from 'react';
import { EventBusContext } from 'services/EventBus';

export const useEventBus = () => useContext(EventBusContext);

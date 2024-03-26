
import { EventBus } from './EventBus';

/**
 * Provides a unique instance of the event bus.
 */
export class EventBusSingleton {
  static instance;

  static getInstance() {
    if (!EventBusSingleton.instance) {
      EventBusSingleton.instance = new EventBus();
    }
    return EventBusSingleton.instance;
  }
}

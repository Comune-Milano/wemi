
import { isFunction } from 'utils/functions/typeCheckers';

/* eslint-disable no-underscore-dangle */

export class EventSubscription {
  constructor(id, handler, eventName) {
    this.id = id;
    this.handler = handler;
    this.eventName = eventName;
  }

  /**
   * Gets the id.
   */
  get id() {
    return this._id;
  }

  /**
   * Sets the id.
   */
  set id(value) {
    this._id = value;
  }

  /**
   * Gets the handler for the event.
   */
  get handler() {
    return this._handler;
  }

  /**
   * Sets the handler for the event.
   */
  set handler(value) {
    if (!isFunction(value)) {
      throw new Error('The provided handler for the event is not a function.');
    }
    this._handler = value;
  }

  /**
   * Gets the event name for this subscription.
   */
  get eventName() {
    return this._eventName;
  }

  /**
   * Sets the event name for this subscription.
   */
  set eventName(value) {
    this._eventName = value;
  }
}

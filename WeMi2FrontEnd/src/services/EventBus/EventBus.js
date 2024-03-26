
/* eslint-disable no-underscore-dangle */

import { getObjectValue } from 'utils/extensions/objectExtensions';
import { EventSubscription } from './EventSubscription';

export class EventBus {
  /**
   * @constructor
   */
  constructor() {
    this._subscriptions = new Map();
  }

  /**
   * Gets the number of subscriptions for the given event.
   * @param {*} eventName
   */
  getEventSubscriptionsCount(eventName) {
    const eventSubscriptions = this._subscriptions.get(eventName);
    return eventSubscriptions ? eventSubscriptions.size : 0;
  }

  /**
   * Init the subscriptions for an event.
   * @param {*} eventName
   */
  initEventSubscriptions(eventName) {
    if (this._subscriptions.has(eventName)) {
      return;
    }
    // Create a new entry for the given event name.
    this._subscriptions.set(eventName, new Set());
  }

  /**
   * Subscribes to an event.
   * @param {*} eventName
   * @param {*} handler
   */
  subscribe(eventName, handler) {
    this.initEventSubscriptions(eventName);

    // Create an identifier for the subscription.
    const handlerName = getObjectValue(handler, 'name');
    const subscriptionIdentifier = Symbol(`${eventName} (${handlerName} || 'Unkown handler')`);

    // Let's keep track of the subscription.
    const eventSubscriptions = this._subscriptions.get(eventName);
    const newEventSubscription = new EventSubscription(subscriptionIdentifier, handler, eventName);
    eventSubscriptions.add(newEventSubscription);

    // Return an unsubscription function.
    return () => this.unsubscribe(eventName, newEventSubscription);
  }

  /**
   * Publishes an event against to set of subscribers.
   * @param {*} eventName
   * @param {*} payload
   */
  publish(eventName, payload) {
    // Do nothing if the subscriptions set for the given event is empty.
    const eventSubscriptionSet = this._subscriptions.get(eventName);
    if (!eventSubscriptionSet ||
      eventSubscriptionSet.size === 0
    ) {
      return;
    }
    // Otherwise call each handler registered for the given event.
    eventSubscriptionSet.forEach(
      subscription => subscription.handler(payload)
    );
  }

  /**
   * Deregister the handler for the event name.
   * @param {*} eventName
   * @param {*} subscription
   */
  unsubscribe(eventName, subscription) {
    const eventSubscriptionsSet = this._subscriptions.get(eventName);
    if (!eventSubscriptionsSet ||
      eventSubscriptionsSet.size === 0
    ) {
      return;
    }

    eventSubscriptionsSet.delete(subscription);

    if (eventSubscriptionsSet.size === 0) {
      this._subscriptions.delete(eventName);
    }
  }

  /**
   * Detaches all subscriptions for the given event.
   * @param {*} eventName
   */
  detachEventSubscriptions(eventName) {
    if (!this._subscriptions.has(eventName)) {
      return;
    }
    this._subscriptions.delete(eventName);
  }

  /**
   * Detaches the subscriptions for all registered events.
   */
  detachAll() {
    this._subscriptions.clear();
  }
}

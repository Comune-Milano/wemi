
import React, { createContext, useContext } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { useLogger } from 'services/Logger';
import { __BASE_URL__, __WEBSOCKET_PATH__, __PRODUCTION__ } from 'utils/environment/variables';

const SubscriptionClientContext = createContext();

export const SubscriptionClientCtxProvider = ({
  wsPath = 'graphql', // The expected shape is: host:port
  wsHost = window.location.host + __BASE_URL__, // The expected shape is: base_path
  options,
  children,
}) => {
  const protocol = __PRODUCTION__? 'wss' : 'ws';
  const subscriptionClient = new SubscriptionClient(`${protocol}://${wsHost}/${wsPath}`, {
    reconnect: true,
    lazy: true,
    ...options,
  });

  return (
    <SubscriptionClientContext.Provider value={subscriptionClient}>
      { children }
    </SubscriptionClientContext.Provider>
  );
};

SubscriptionClientCtxProvider.displayName = 'SubscriptionClientCtxProvider';

/**
 * An hook provide a instance of the subscription client
 * retrieving it from the context.
 */
export const useSubscriptionClient = () => {
  const logger = useLogger();
  const subscriptionCtx = useContext(SubscriptionClientContext);

  if (!subscriptionCtx) {
    logger.error('No provider specifed for "SubscriptionClientContext"');
  }

  return subscriptionCtx;
};

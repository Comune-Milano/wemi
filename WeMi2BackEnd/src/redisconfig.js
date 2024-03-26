import redis from 'redis';
import { pubsub, SESSION_EXPIRATION } from "utility/contextcreation";
import { REDIS_HOST } from 'environment';

export const sessionPrefix = 'session';
/**
 * The redis config. Redis can manage at most 15 in-memory stores.
 */
const redisConfiguration = {
  db: 0,
  host: REDIS_HOST
};

/**
 * The redis client acting as to publish events.
 */
export const publisher = redis.createClient(redisConfiguration);

/**
 * The redis client allowing subscriptions.
 */
const subscriber = redis.createClient(redisConfiguration);

// Setup the subscription for expired events.
const expiredStoreKey = `__keyevent@${redisConfiguration.db}__:expired`;

//Set the notify keyspace for expire events
subscriber.config("SET", "notify-keyspace-events", "Ex");

subscriber.subscribe(expiredStoreKey);

// Listen for messages.
subscriber.on('message', (channel, message) => {

  const [prefix, sessionID] = message.split(':');
  if(channel === expiredStoreKey){
    switch(prefix){
      case sessionPrefix:
          const payload = {
            sessionExpirationNotify: true, 
            sessionIndex: sessionID
          };
          pubsub.publish(SESSION_EXPIRATION, payload);
          break;    
      default:
        break;
    }
  }
  
});
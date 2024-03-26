const testEnvironment = 'test';

const devEnvironment = 'development';

const productionEnvironment = 'production';

const envTimeToLive = process.env.SESSION_TTL;

/**
 * Environments variable
 */
export const environment = process.env.NODE_ENV;

export const __TEST__ = environment === testEnvironment;

export const __DEV__ = environment === devEnvironment;

export const __PRODUCTION__ = environment === productionEnvironment;

export const __APP_LOG__ = process.env.WEMI2_APP_LOG || 'N';

export const __LOG_ENABLED__ = __APP_LOG__ === 'Y';

export const domain = process.env.DOMAIN;

// Storage env vars.
export const { STORAGE_BOUND_PATH } = process.env;
export const {STORAGE_ABS_PATH } = process.env;

// Redis host variable
export const { REDIS_HOST } = process.env;

export const sessionTimeToLive = function() {

  const transformToSeconds = 60;

  /**
   * Default time to live in minutes
   */
  const defaultTimeToLive = 5;

  /**
   * Transforming minutes in seconds for default time to live
   */
  const defaultTimeToLiveSeconds = defaultTimeToLive * transformToSeconds;

  /**
   * Transforming minutes in seconds for env time to live
   */
  const envTimeToLiveSeconds = envTimeToLive * transformToSeconds;

  /**
   * Comparison between the two times in seconds.
   * If env time >= default time set the env time
   * else it sets to the default time
   */
  if(envTimeToLiveSeconds >= defaultTimeToLiveSeconds){
    return envTimeToLiveSeconds;
  }

  return defaultTimeToLiveSeconds;
  
}();
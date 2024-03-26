
import {
  __DEV__,
  __PRODUCTION__,
  __BASE_URL__,
  __PUBLIC_URL__,
} from 'utils/environment/variables';

const findRelativeAddress = () => {
  let serverHostPort;
  if (__DEV__) {
    serverHostPort = __PUBLIC_URL__ + __BASE_URL__;
  }
  else if(__PRODUCTION__){
    //TODO....
  }
  return serverHostPort;
}

export default findRelativeAddress;
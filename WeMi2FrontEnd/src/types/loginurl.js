import { __BASE_URL__ } from 'utils/environment/variables';

export const LOGIN_URL = __BASE_URL__ ? `${window.location.origin + __BASE_URL__}/login` : `${window.location.origin}/login`;

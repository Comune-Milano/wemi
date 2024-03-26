import { serverGraphQL } from './routes/graphql';
import { invokeLogout } from './routes/invokelogout';
import { authentication } from './routes/authentication';
import { logout } from './routes/logout';
import { logoutcallback } from './routes/logoutcallback';
import { staticFiles } from './routes/staticfiles';
import { errorLog } from './routes/errorlog';

export default {
  serverGraphQL,
  invokeLogout,
  authentication,
  logout,
  logoutcallback,
  errorLog,
  staticFiles,
};
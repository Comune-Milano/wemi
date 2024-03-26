import 'dotenv/config';
import http from 'http';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import * as samlify from 'samlify';
import * as validator from '@authenio/samlify-node-xmllint';
import bunyan from 'bunyan';
import connectRedis from 'connect-redis';
import router  from './router';
import { FRONTEND, SESSION_NAME } from './constants/constants';
import { __LOG_ENABLED__, __PRODUCTION__, sessionTimeToLive, domain, STORAGE_BOUND_PATH, REDIS_HOST } from 'environment';
import { SECRET } from 'constants/authentication/cookie';
import { logger } from 'utility/logger/getInstance';
import { publisher, sessionPrefix } from 'redisconfig';
import { handleError } from 'router/errors';

if(!__LOG_ENABLED__) {
  logger.level(bunyan.FATAL + 1);
}

const redisStore = connectRedis(session);

const store = new redisStore({
  host: REDIS_HOST,
  port: 6379,
  client: publisher,
  ttl: sessionTimeToLive, // The ttl will be used as cookie expiration date as second.
  prefix: `${sessionPrefix}:`,
});


samlify.setSchemaValidator(validator);
const app = express();

const corsOptions = {
  'origin': FRONTEND,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
  'optionsSuccessStatus': 204,
  'credentials': true,
};


const sessionOptions = {
  resave: false,
  rolling: true,
  name: SESSION_NAME,
  saveUninitialized: false,
  secret: SECRET,
  store: store,
  cookie: {
    domain: __PRODUCTION__ ? domain : undefined,
    /**
     * Options per mettere in sicurezza il cookie
     */
    sameSite: __PRODUCTION__,
  },
};

const compressionOptions = {
  threshold: '80kb',
};

app.use(compression(compressionOptions));
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(session(sessionOptions));

app.use('/invokeLogout', router.invokeLogout);
app.use('/authentication', router.authentication);
/**
 * Authentication SAML with passport
 */
app.use('/logout', router.logout);
app.use('/logoutcallback', router.logoutcallback);
app.use('/errorlog', router.errorLog);
app.use(`/${STORAGE_BOUND_PATH}`, router.staticFiles);

app.use((err, req, res, next) => {
  handleError(err, res);
});

router.serverGraphQL.applyMiddleware({ app, path: '/graphql', cors: false });
const httpServer = http.createServer(app);


router.serverGraphQL.installSubscriptionHandlers(httpServer);


const port = process.env.WEMI2_BACKEND_PORT;

httpServer.listen(port, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});

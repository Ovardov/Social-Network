// Libraries
import { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passportInitialize from 'passport/lib/middleware/initialize';
// Config
import {corsOrigin, authCookieSecret} from './config';

export const initExpress = (app) => {
  app.use(
    cors({
      origin: corsOrigin,
      credentials: true,
    })
  );

  app.use(urlencoded({ extended: true }));

  app.use(json());

  app.use(cookieParser(authCookieSecret));

  app.use(passportInitialize());
}

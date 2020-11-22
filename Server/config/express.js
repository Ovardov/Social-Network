const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');

module.exports = (app) => {
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true
  }));

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use(cookieParser(config.authCookieSecret));

  app.use(passport.initialize());
};
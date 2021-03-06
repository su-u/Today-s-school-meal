import * as functions from 'firebase-functions';
import { router } from './routes/users';
const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

const LOGGER_ENV: string = process.env.LOGGER_ENV || 'combined';

app.use(logger(LOGGER_ENV));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', router);

const api = functions.https.onRequest(app);
export { api };

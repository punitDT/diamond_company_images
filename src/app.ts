import express, { RequestHandler } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import json2xls from 'json2xls';
import apiV1UnAuthRoutes from './routes/unAuthRoute';
import apiV1AuthRoutes from './routes/authRoute';
import { logger, accessSuccessLogger, accessErrorLogger } from './utils/logger';
import { tokenHandler } from './middlewares';
import multer from 'multer';
import path from 'path';
import { httpStatusCodes } from './utils/constants';
import dotenv from 'dotenv';
import stock from '../src/controllers/admin/stock';

dotenv.config({ path: path.join(__dirname, '../.env') });

const upload = multer();

const app = express();

// register loggers
app.use(accessSuccessLogger);
app.use(accessErrorLogger);
app.use(express.static(path.join(__dirname, 'public')));

app.disable('x-powered-by');
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(json2xls.middleware);

global.stocksUpdatedId = [];
global.isMelleUploading = false;

app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000',
            'https://brands.wherehouse.io',
            'https://wherehouse-seller-staging.web.app',
            'https://seller-staging-test.web.app'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);
app.use(cookieParser('CookieSecret'));

app.all('/*', (req, res, next) => {
    // 	// CORS headers
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,Client-Key');

    if (req.method === 'OPTIONS') {
        res.status(httpStatusCodes.SUCCESS_CODE).end();
    } else {
        next();
    }
});

// parse FormData
app.use(upload.array());

app.use('/api/v1', apiV1UnAuthRoutes);
app.use('/api/v1/auth', tokenHandler, apiV1AuthRoutes);

// global error handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json('Ouch! Something broke!');
    next();
});

setTimeout(() => {
    // AdminProductsCron();
    // productsCron();
    // stock.getImageUrl('');
    // stock.getDiamonds();
});

export = app;

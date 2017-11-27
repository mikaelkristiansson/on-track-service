import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from 'config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import middleware from './app/auth/middleware';
import auth from './app/routers/auth';
import exercise from './app/routers/exercises';

// Connect to MongoDB
/** @namespace config.mongodb.database */

mongoose.connect(config.mongodb.database, {
    useMongoClient: true
});
mongoose.connection.on('error', err => console.error(`MongoDB connection error: ${err}`));
mongoose.Promise = global.Promise;

// Initialize http server
const app = express();

// For each request, provide wildcard Access-Control-* headers via OPTIONS call
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// Logger that outputs all requests into the console
app.use(morgan('combined'));


app.use('/auth', auth);
app.use('/api', middleware, (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({message: 'invalid token...'});
    }
});
// Use api as prefix for all API endpoints
app.use('/api', exercise);

// A simple protected route for demo purposes
app.get('/api/test', function (req, res) {
    res.status(200).send({
        message: 'Hello world! ;D'
    })
});

// Middleware to catch 404 errors
app.use(function(req, res) {
    res.status(404).send({message: 'api route not found'});
});

const server = app.listen(3000, () => {
    const {address, port} = server.address();
    console.log(`Listening at http://localhost:${port}`);
});

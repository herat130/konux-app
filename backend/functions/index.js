const functions = require('firebase-functions');
const express = require('express');
const cors =require('cors');
const timeout =require('connect-timeout');
const dotenv =require('dotenv');
const compression =require('compression');
const helmet =require('helmet');
const routes = require('./routes');
const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
const app = express();

app.use(cors({origin:true}));
app.use(compression());
app.use(helmet());
app.use(timeout('10s'));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) return next();
    return null;
}

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


app.use('/',routes);

exports.app = functions.https.onRequest(app);

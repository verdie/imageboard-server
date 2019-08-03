const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db');
const Image = require('./image/model')
const app = express();
const port = process.env.PORT || 4000;
const middleware = cors()
const jsonParser = bodyParser.json()
const imageRouter = require('./image/router')
const authRouter= require('./auth/router')
const userRouter = require('./user/router')
app.use(middleware);
app.use(jsonParser);
app.use(imageRouter);
app.use(authRouter);
app.use(userRouter)
app.listen(port);
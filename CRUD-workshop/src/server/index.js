const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fetch = require('node-fetch');

const config = require('./config');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const errorHandler = require('./middlewares/errorHandler');

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConf from '../../webpack.config';

const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'travisci';
const app = express();

app.listen(config.port, err => {
  if (err) throw err;
  console.log(`Server listening on port ${config.port}!`);
});
app.use(cors());
if (!isProd) {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret,
}));

if (isProd) {
  app.use(express.static('client'));
} else {
  const compiler = webpack(webpackConf);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: webpackConf.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.use(express.static('public'));
app.use('/api', authRoute);
app.use('/api', postRoute);
app.use('*', async (req, res) => {
  const indexPage = await fetch(req.protocol + '://' + req.get('host'))
    .then(async (response) => response.text())
    .catch(async (e) => console.error(e));
  return res.send(indexPage);
});

app.use(errorHandler);

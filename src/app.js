const express = require('express');

const routes = require('./frameworks/expressSpecific/routes');

const dependencies = require('./config/dependencies');

const PORT = process.env.PORT || 3000;

const API_PREFIX = process.env.API_PREFIX || '/api/v1';

const app = express();

module.exports = {
  start: () => {
    // Middleware:
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes:
    app.use(`${API_PREFIX}`, routes(dependencies));

    // Common error handling:

    // Start server:
    app.listen(PORT, () => {
      console.log('Server is listening on port', PORT);
    });
  },
};

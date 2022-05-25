// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./api/route');

// Load environment variables
dotenv.config({ path: '.env' });

// Express server.
const app = express();

// Connect to MongoDB.
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.error('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Config
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

// Middleware
require('./config/middleware')(app);

// api routes
app.use('/api/cache', routes);

// Server bootstrap
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
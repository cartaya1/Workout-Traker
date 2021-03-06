const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const compression = require('compression');

// Create express server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger('dev'));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// compress all responses
app.use(compression());

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If deployed on heroku, use the deployed database. Otherwise use the local workout database
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
 },
);

// routes
app.use(require('./routes/api-routes'));
app.use(require('./routes/html-routes'));

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});

'use strict';

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

// Create Express app
const app = express();

// Serve static files from the 'public' directory
app.use('/public', express.static(process.cwd() + '/public'));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: '*' }));

// Parse request bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index page
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Setup FCC testing routes
fccTestingRoutes(app);

// Define API routes
apiRoutes(app);

// Handle 404 Not Found
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found');
});

// Start the server and tests
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; // For testing

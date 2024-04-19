'use strict/';

// Import ConvertHandler class
const ConvertHandler = require('../controllers/convertHandler');

// Create a new instance of ConvertHandler
const convertHandler = new ConvertHandler();

// Define the API routes
module.exports = function (app) {

  // Route to handle conversion
  app.route('/api/convert')
    .get((req, res) => {
      // Get user input
      const input = req.query.input;
      // Extract numerical part from input
      const initNum = convertHandler.getNum(input);
      // Extract unit part from input
      const initUnit = convertHandler.getUnit(input);
      // If either numerical or unit part is invalid, return error response
      if (!initNum && !initUnit) {
        return res.json({ error: 'invalid number and unit' });
      }
      if (!initNum) {
        return res.json({ error: 'invalid number' });
      }
      if (!initUnit) {
        return res.json({ error: 'invalid unit' });
      }
      // Get return unit
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      // Perform conversion
      const returnNum = convertHandler.convert(initNum, initUnit);
      // Format the string
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      // Send response with conversion result
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      });
    });

};

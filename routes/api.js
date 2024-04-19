"use strict";

// Require the ConvertHandler module
const ConvertHandler = require("../controllers/convertHandler");

// Export a function that takes an Express app as a parameter
module.exports = function (app) {
  // Create an instance of ConvertHandler
  const convertHandler = new ConvertHandler();

  // Define a route handler for the /api/convert endpoint
  app.route("/api/convert").get((req, res) => {
    // Get the input query parameter from the request
    const input = req.query.input;

    // Get the numerical value from the input
    const initNum = convertHandler.getNum(input);

    // Get the unit from the input
    const initUnit = convertHandler.getUnit(input);

    // If both the number and unit are invalid, respond with an error message
    if (!initNum && !initUnit) {
      res.json({ error: "invalid number and unit" });
    } 
    // If the number is invalid, respond with an error message
    else if (!initNum) {
      res.json({ error: "invalid number" });
    } 
    // If the unit is invalid, respond with an error message
    else if (!initUnit) {
      res.json({ error: "invalid unit" });
    } 
    // If both the number and unit are valid, perform the conversion
    else {
      // Convert the initial number and unit to the return number
      const returnNum = convertHandler.convert(initNum, initUnit);
      
      // Get the return unit based on the initial unit
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      
      // Get the string representation of the conversion result
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Respond with JSON containing the conversion details
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      });
    }
  });
};

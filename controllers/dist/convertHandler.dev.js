'use strict'; // Create a ConvertHandler class

function ConvertHandler() {
  // Method to parse and extract the numerical part of the input
  this.getNum = function (input) {
    // Define a regular expression to match a valid number format
    var numberRegex = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/; // Use regex to match the number part of the input

    var numMatch = input.match(numberRegex); // If no valid number is provided, default to 1

    if (!numMatch) return 1; // Extract the number string from the match

    var numString = numMatch[0]; // Split the number string by '/' to handle fractions

    var parts = numString.split('/'); // If there are more than two parts (double fraction), return 'invalid number'

    if (parts.length > 2) return 'invalid number'; // Evaluate the number string to get the result

    var result = eval(numString);
    return result;
  }; // Method to extract and validate the unit part of the input


  this.getUnit = function (input) {
    // Define a regular expression to match alphabetic characters
    var unitRegex = /[a-zA-Z]+/; // Use regex to match the unit part of the input

    var unitMatch = input.match(unitRegex); // Extract the unit string from the match or return null if no unit is provided

    var unit = unitMatch ? unitMatch[0] : null; // If no unit is provided, return 'invalid unit'

    if (!unit) return 'invalid unit'; // Define an array of valid units

    var validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']; // Convert the unit to lower case and check if it's valid

    if (!validUnits.includes(unit.toLowerCase())) return 'invalid unit'; // Return the unit in lower case

    return unit.toLowerCase();
  }; // Method to get the return unit for a given initial unit


  this.getReturnUnit = function (initUnit) {
    // Define a mapping of units and their corresponding return units
    var unitMap = {
      'gal': 'l',
      'l': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    }; // Get the return unit from the mapping, converting both units to lower case

    return unitMap[initUnit.toLowerCase()];
  }; // Method to spell out the unit in full


  this.spellOutUnit = function (unit) {
    // Define a mapping of units and their spelled-out versions
    var unitMap = {
      'gal': 'gallons',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    }; // Get the spelled-out version of the unit, converting it to lower case

    return unitMap[unit.toLowerCase()];
  }; // Method to perform the conversion between units


  this.convert = function (initNum, initUnit) {
    // Define conversion factors for different units
    var galToL = 3.78541;
    var lbsToKg = 0.453592;
    var miToKm = 1.60934;
    var result; // Perform the conversion based on the initial unit

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;

      case 'l':
        result = initNum / galToL;
        break;

      case 'lbs':
        result = initNum * lbsToKg;
        break;

      case 'kg':
        result = initNum / lbsToKg;
        break;

      case 'mi':
        result = initNum * miToKm;
        break;

      case 'km':
        result = initNum / miToKm;
        break;
    } // Return the result rounded to 5 decimals


    return parseFloat(result.toFixed(5));
  }; // Method to generate the output string


  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // Get the spelled-out versions of the units
    var initUnitString = this.spellOutUnit(initUnit);
    var returnUnitString = this.spellOutUnit(returnUnit); // Construct and return the output string

    return "".concat(initNum, " ").concat(initUnitString, " converts to ").concat(returnNum, " ").concat(returnUnitString);
  };
} // Export the ConvertHandler class


module.exports = ConvertHandler;
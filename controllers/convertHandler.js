'use strict';

function ConvertHandler() {
  // Convert number to valid format
  this.getNum = function(input) {
    const num = parseFloat(input) || 1; // Default to 1 if invalid
    return num;
  };

  // Get unit and ensure it's valid
  this.getUnit = function(input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']; // Valid units
    const unit = input.toLowerCase(); // Convert to lower case
    if (validUnits.includes(unit)) {
      return unit;
    } else {
      return 'invalid unit';
    }
  };

  // Get return unit based on input unit
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'lbs': 'kg',
      'mi': 'km',
      'l': 'gal',
      'kg': 'lbs',
      'km': 'mi'
    };
    return unitMap[initUnit];
  };

  // Get full unit name
  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return unitNames[unit];
  };

  // Convert input into desired output
  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      'gal': 3.78541, // Gallons to liters
      'lbs': 0.453592, // Pounds to kilograms
      'mi': 1.60934, // Miles to kilometers
      'l': 0.264172, // Liters to gallons
      'kg': 2.20462, // Kilograms to pounds
      'km': 0.621371 // Kilometers to miles
    };

    const result = initNum * conversionRates[initUnit];
    return parseFloat(result.toFixed(5)); // Round to 5 decimal places
  };

  // Generate output string
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;

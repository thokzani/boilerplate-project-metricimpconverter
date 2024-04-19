'use strict';

// Define the ConvertHandler class
function ConvertHandler() {
  
  // Method to extract numerical part from input
  this.getNum = function(input) {
    // Regular expression to match the numerical part of the input
    const numRegex = /^(\d+(\.\d+)?)(\/\d+(\.\d+)?)?/;
    // Extract numerical part from input
    const result = input.match(numRegex);
    // If no numerical part is found or if it's an invalid fraction, return default 1
    if (!result) {
      return 1;
    }
    // Parse and return the numerical part
    return eval(result[1]);
  };
  
  // Method to extract unit part from input
  this.getUnit = function(input) {
    // Regular expression to match the unit part of the input
    const unitRegex = /[a-zA-Z]+$/;
    // Extract unit part from input
    const result = input.match(unitRegex);
    // If no unit part is found or if it's an invalid unit, return null
    if (!result) {
      return null;
    }
    // Convert unit to lowercase and return
    return result[0].toLowerCase();
  };
  
  // Method to get the return unit
  this.getReturnUnit = function(initUnit) {
    // Define conversion map for different units
    const unitMap = {
      gal: 'l',
      l: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };
    // Lookup and return the return unit based on the initial unit
    return unitMap[initUnit];
  };

  // Method to spell out unit
  this.spellOutUnit = function(unit) {
    // Define unit spellings
    const unitSpellings = {
      gal: 'gallons',
      l: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    };
    // Lookup and return the spelled out unit
    return unitSpellings[unit];
  };
  
  // Method to perform conversion
  this.convert = function(initNum, initUnit) {
    // Define conversion factors
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    // Perform conversion based on the initial unit
    switch (initUnit) {
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
      default:
        result = null;
    }
    // Round result to 5 decimal places
    return parseFloat(result.toFixed(5));
  };
  
  // Method to format the string
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Get spelled out units
    const initSpellOut = this.spellOutUnit(initUnit);
    const returnSpellOut = this.spellOutUnit(returnUnit);
    // Construct the string based on conversion
    const resultString = `${initNum} ${initSpellOut} converts to ${returnNum} ${returnSpellOut}`;
    return resultString;
  };
  
}

// Export the ConvertHandler class
module.exports = ConvertHandler;

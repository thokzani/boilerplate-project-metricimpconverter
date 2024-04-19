'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', async (req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    const response = {
      'initNum': initNum,
      'initUnit': initUnit,
      'returnNum': returnNum,
      'returnUnit': returnUnit,
      'string': string
    };

    const invalidNumber = (initNum == convertHandler.invalid_number);
    const invalidUnit = (initUnit == convertHandler.invalid_unit);

    if (invalidNumber && invalidUnit) res.send(convertHandler.invalid_number_and_unit);
    else if (invalidNumber) res.send(convertHandler.invalid_number);
    else if (invalidUnit) res.send(convertHandler.invalid_unit);
    else res.json(response);
  });
};
'use strict';

var express = require('express');

var router = express.Router();

var ConvertHandler = require('../controllers/convertHandler');

var convertHandler = new ConvertHandler();
router.get('/convert', function (req, res) {
  var input = req.query.input;

  if (!input) {
    return res.status(400).json({
      error: 'No input provided'
    });
  }

  var initNum = convertHandler.getNum(input);
  var initUnit = convertHandler.getUnit(input);

  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.status(400).json({
      error: 'Invalid number and unit'
    });
  } else if (initNum === 'invalid number') {
    return res.status(400).json({
      error: 'Invalid number'
    });
  } else if (initUnit === 'invalid unit') {
    return res.status(400).json({
      error: 'Invalid unit'
    });
  }

  var returnNum = convertHandler.convert(initNum, initUnit);
  var returnUnit = convertHandler.getReturnUnit(initUnit);
  var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
  res.json({
    initNum: initNum,
    initUnit: initUnit,
    returnNum: returnNum,
    returnUnit: returnUnit,
    string: string
  });
});
module.exports = router;
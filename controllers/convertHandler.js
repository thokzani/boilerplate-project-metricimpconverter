function ConvertHandler() {
  let units = {
    kg: {
      name: "kilograms",
      returnUnit: "lbs",
    },
    lbs: {
      name: "pounds",
      returnUnit: "kg",
    },
    mi: {
      name: "miles",
      returnUnit: "km",
    },
    km: {
      name: "kilometers",
      returnUnit: "mi",
    },
    gal: {
      name: "gallons",
      returnUnit: "L",
    },
    l: {
      name: "liters",
      returnUnit: "gal",
    },
  };

  this.getNum = function (input) {
    // trim unit from the input
    let unit = input.match(/[a-zA-Z]+$/)[0];
    // return 1 when no numerical input is provided
    if (unit.length === input.length) return 1;
    // test if remaining string contains any invalid characters
    let unitStartIndex = input.lastIndexOf(unit);
    let result = input.slice(0, unitStartIndex);
    const regex = /^[0-9\.\/]+$/;
    if (!regex.test(result)) throw new Error("invalid number");

    const floatRegex = /^-?[\d]*(\.[\d]+)?$/;
    // check if remaining string contains "/"
    if (result.indexOf("/") !== -1) {
      let splitres = result.split("/");
      // throw Error if string has more than one "/"
      if (splitres.length !== 2) throw new Error("invalid number");
      // check if the input is a valid number
      if (!floatRegex.test(splitres[0]) || !floatRegex.test(splitres[1])) throw new Error("invalid number");
      // parse divident and divisor into float, and calculate the result
      result = parseFloat(splitres[0]) / parseFloat(splitres[1]);
      result = parseFloat(result.toFixed(5));
    } else {
      // check if the input is a valid number
      if (!floatRegex.test(result)) throw new Error("invalid number");
      result = parseFloat(result);
    }

    return result;
  };

  this.getUnit = function (input) {
    // match input using regular expression
    let unitRegex = new RegExp(`(?<=^|[0-9])(${Object.keys(units).join("|")})$`);
    let result = input.toLowerCase().match(unitRegex);
    // throw Error if no match
    if (!Array.isArray(result)) throw new Error("invalid unit");
    // special return for "L"
    if (result[0] === "l") return "L";
    // return first element of matching result
    return result[0];
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit.toLowerCase()].returnUnit;
  };

  this.spellOutUnit = function (unit) {
    return units[unit.toLowerCase()].name;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = (() => {
      switch (initUnit) {
        case "kg":
          return initNum / lbsToKg;
        case "lbs":
          return initNum * lbsToKg;
        case "L":
          return initNum / galToL;
        case "gal":
          return initNum * galToL;
        case "km":
          return initNum / miToKm;
        case "mi":
          return initNum * miToKm;
      }
    })();
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
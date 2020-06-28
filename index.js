const tmpJson = require('./correct-tmp.json');
const enJson = require('./correct-json.json');
const fs = require('fs');

const fixJsonMissedData = (originalJson, jsonToFix) => {
  return Object.keys(originalJson).reduce((previous, current) => {
    if (!jsonToFix.hasOwnProperty(current)) {
      return { ...previous, [current]: originalJson[current] };
    } else {
      if (Object(originalJson[current]) === originalJson[current]) {
        return { ...previous, [current]: fixJsonMissedData(originalJson[current], jsonToFix[current], current) };
      } else {
        return previous;
      }
    }
  }, jsonToFix);
};

fs.writeFileSync('./test.json', JSON.stringify(fixJsonMissedData(enJson, tmpJson), null, 4));

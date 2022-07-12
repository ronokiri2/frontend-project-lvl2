// функция принимает на входе массив
// [
//  { key: 'follow', type: 'deleted', value: false },
//  { key: 'host', type: 'unchanged', value: 'hexlet.io' },
//  { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
//  { key: 'timeout', type: 'changed', valueBefore: 50, valueAfter: 20 },
//  { key: 'verbose', type: 'added', value: true }
// ]

// но на самом деле это объект
// [ '0', { key: 'follow', type: 'deleted', value: false } ]
// [ '1', { key: 'host', type: 'unchanged', value: 'hexlet.io' } ]
// [ '2', { key: 'proxy', type: 'deleted', value: '123.234.53.22' } ]
// [ '3', { key: 'timeout', type: 'changed', valueBefore: 50, valueAfter: 20 } ]
// [ '4', { key: 'verbose', type: 'added', value: true } ]

const createTxt = (difference) => {
  // console.log(difference);
  let obj3 = '{\n';
  Object.entries(difference).map((obj) => {
    // console.log(obj[1]);
    if (obj[1].type === 'deleted') {
      obj3 += `  - ${obj[1].key}: ${obj[1].value}\n`;
    } else if (obj[1].type === 'added') {
      obj3 += `  + ${obj[1].key}: ${obj[1].value}\n`;
    } else if (obj[1].type === 'changed') {
      obj3 += `  - ${obj[1].key}: ${obj[1].valueBefore}\n`;
      obj3 += `  + ${obj[1].key}: ${obj[1].valueAfter}\n`;
    } else {
      obj3 += `    ${obj[1].key}: ${obj[1].value}\n`;
    }
    return null;
  });

  obj3 += '}';
  return obj3;
};

export default createTxt;

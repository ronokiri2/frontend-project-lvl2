// [
//  { key: 'follow', type: 'deleted', value: false },
//  { key: 'host', type: 'unchanged', value: 'hexlet.io' },
//  { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
//  { key: 'timeout', type: 'changed', valueBefore: 50, valueAfter: 20 },
//  { key: 'verbose', type: 'added', value: true }
// ]

// функция для преобразования внутреннего объекта в строку
// const stringifyObject = (nestedObject) => {
//   if (!_.isObject(nestedObject)) {
//     return nestedObject
//   } else {
//     return Object.keys(nestedObject).map((key) => {key,})
//   }
// }

const createNestedTxt = (difference, depth = 1) => {
  const space = '  ';
  const spaces = space.repeat(depth);
  let result = '{\n';
  difference.forEach((obj) => {
    console.log(obj);
    if (obj.type === 'unchanged') {
      result += `${spaces}  ${obj.key}: ${obj.value}\n`;
    } else if (obj.type === 'deleted') {
      result += `${spaces}- ${obj.key}: ${obj.value}\n`;
    } else if (obj.type === 'added') {
      result += `${spaces}+ ${obj.key}: ${obj.value}\n`;
    } else if (obj.type === 'changed') {
      result += `${spaces}- ${obj.key}: ${obj.valueBefore}\n`;
      result += `${spaces}+ ${obj.key}: ${obj.valueAfter}\n`;
    } else if (obj.type === 'nested') {
      console.log('nested');
    }
  });
  result += '}';
  return result;
};

export default createNestedTxt;

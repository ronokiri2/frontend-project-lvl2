// [
//  { key: 'follow', type: 'deleted', value: false },
//  { key: 'host', type: 'unchanged', value: 'hexlet.io' },
//  { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
//  { key: 'timeout', type: 'changed', valueBefore: 50, valueAfter: 20 },
//  { key: 'verbose', type: 'added', value: true }
// ]

import _ from 'lodash';
// функция для преобразования внутреннего объекта в строку
const stringifyObject = (nestedObject) => {
  if (!_.isObject(nestedObject)) {
    return nestedObject;
  }
  return Object.keys(nestedObject).map((key) => ({ key, status: 'unchanged', value: nestedObject[key] }));
};

const createNestedTxt = (difference, depth = 1) => {
  const space = '  ';
  const spaces = space.repeat(depth);
  const result = [];
  difference.forEach((obj) => {
    if (obj.type === 'unchanged') {
      result.push(`${spaces}  ${obj.key}: ${obj.value}\n`);
    } else if (obj.type === 'deleted') {
      result.push(`${spaces}- ${obj.key}: ${obj.value}\n`);
    } else if (obj.type === 'added') {
      result.push(`${spaces}+ ${obj.key}: ${obj.value}\n`);
    } else if (obj.type === 'changed') {
      result.push(`${spaces}- ${obj.key}: ${obj.valueBefore}\n`);
      result.push(`${spaces}+ ${obj.key}: ${obj.valueAfter}\n`);
    } else if (obj.type === 'nested') {
      result.push(`${spaces}  ${obj.key}: {\n`);
      const a = createNestedTxt(obj.children, depth + 1);
      // console.log('top');
      result.push(a);
      result.push(`${spaces}\n`);
      // result += createNestedTxt(obj.value, depth + 4);
    } else if (_.isPlainObject(obj.children)) {
      result.push(`${spaces}  ${obj.key}: {\n`);
      const b = createNestedTxt(stringifyObject(obj.value, depth + 1));
      result.push(b);
      result.push(`${spaces}\n`);
      // result += createNestedTxt(obj.value, depth + 4);
    }
  });
  result.push('}');
  return result.join('');
};

export default createNestedTxt;

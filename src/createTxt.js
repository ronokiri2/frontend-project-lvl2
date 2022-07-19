// [
//  { key: 'follow', type: 'deleted', value: false },
//  { key: 'host', type: 'unchanged', value: 'hexlet.io' },
//  { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
//  { key: 'timeout', type: 'changed', valueBefore: 50, valueAfter: 20 },
//  { key: 'verbose', type: 'added', value: true }
// ]

import _ from 'lodash';

// функция для преобразования внутреннего объекта в строку
// const stringifyObject = (obj) => {
//   console.log(`PLAIN OBJECT KEY = ${obj.key}`);
//   console.log(`PLAIN OBJECT STATUS = ${obj.status}`);
//   console.log(`PLAIN OBJECT VALUE = ${obj.value}`);

//   return Object.keys(obj).map((key) => ({ key, status: 'unchanged', value: obj[key] }));
// };
// const indent = (depthLevel, count = 4) => ' '.repeat(depthLevel * count - 2);

// const stringify = (value, depth) => {
//   if (!_.isPlainObject(value)) {
//     return value;
//   }

//   const result = Object.entries(value).map(([key, content]) => {
//     const handledContent = `${stringify(content, depth + 1)}`;
//     return `${indent(depth + 1)}  ${key}: ${handledContent}`;
//   });

//   return `{\n${result.join('\n')}\n${indent(depth)}  }`;
// };

// const stringify = (value, depth) => {
//   const space = '  ';
//   const spaces = space.repeat(depth);
//   const result = [];
//   value.forEach((obj) => {
//     if (obj.type === 'nested') {
//       console.log('nested');
//       // result += createNestedTxt(obj.value, depth + 4);
//     } else if (_.isPlainObject(obj.value)) {
//       console.log('plain');
//     } else if (obj.type === 'unchanged') {
//       result.push(`${spaces}  ${obj.key}: ${obj.value}\n`);
//     } else if (obj.type === 'deleted') {
//       result.push(`${spaces}- ${obj.key}: ${obj.value}\n`);
//     } else if (obj.type === 'added') {
//       result.push(`${spaces}+ ${obj.key}: ${obj.value}\n`);
//     } else if (obj.type === 'changed') {
//       result.push(`${spaces}- ${obj.key}: ${obj.valueBefore}\n`);
//       result.push(`${spaces}+ ${obj.key}: ${obj.valueAfter}\n`);
//     }
//   });
// };

const indent = (depth) => '  '.repeat(depth);

const stringify = (elem, depth) => {
  if (!_.isObject(elem)) {
    return elem;
  }
  const string = Object.entries(elem).map(([key, value]) => {
    const a = `${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
    return a;
  });
  return string;
};

const renderDiff = (obj, depth) => {
  if (obj.type === 'unchanged') {
    return `${indent(depth)}  ${obj.key}: ${stringify(obj.value, depth + 1)}`;
  } if (obj.type === 'deleted') {
    return `${indent(depth)}- ${obj.key}: ${stringify(obj.value, depth + 1)}`;
  } if (obj.type === 'added') {
    return `${indent(depth)}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`;
  } if (obj.type === 'changed') {
    return `${indent(depth)}- ${obj.key}: ${stringify(obj.valueBefore, depth + 1)}\n${indent(depth)}+ ${obj.key}: ${stringify(obj.valueAfter, depth + 1)}`;
  } if (obj.type === 'nested') {
    const nestedChild = obj.children.map((child) => renderDiff(child, depth + 2));
    const nestedChild2 = nestedChild.join('\n');
    console.log(`nestedChild2 = ${nestedChild2}!`);
    const trimmedNestedChild = nestedChild2.trim();
    console.log(`trimmedNestedChild = ${trimmedNestedChild}`);
    const nestedChild3 = `${trimmedNestedChild}\n${indent(depth)}}`;
    // console.log('nestedChild3');
    // console.log(nestedChild3);
    return `${indent(depth + 2)}+ ${obj.key}: {\n${nestedChild3}`;
  }
return 'x';
  // result.unshift(`${indent(depth - 1)}{\n`);
  // result.push(`${indent(depth - 1)}}`);
  // return result.join('');
  // const result2 = result.unshift('{\n');
  // const result3 = result2.join('');
  // return result3;
};

const createNestedTxt = (difference) => {
  // console.log(difference);
  const map = difference.map((elem) => renderDiff(elem, 1));
  const map2 = map.join('\n');
  const map3 = `{\n${map2}\n}`;
  return map3;
};

export default createNestedTxt;

// import * as fs from 'node:fs';
import _ from 'lodash';
// import yaml from 'js-yaml';

// Работает только с файлами file1.json и file2.json
// не знаю как сделать так, чтобы функция работала и с другими файлами

// функция: значения ключей одинаковы?
const areValuesSame = (obj1, obj2, key) => {
  if (_.isEqual(obj1[key], obj2[key])) {
    return true;
  }
  return false;
};

// функция: у объекта есть ключ?
const hasKey = (obj, key) => {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return true;
  }
  return false;
};

// Главная функция сравнения
const gendiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  const sortedUniqKeys = _.sortBy(uniqKeys);

  // функция ниже вызывается не сразу
  const difference = sortedUniqKeys.map((key) => {
    // if (areValuesSame(obj1, obj2, key) === true) {
    // если значения ключей одинаковы
    // return {key: key, type: 'unchanged', value: obj1[key]};
    if (hasKey(obj1, key) && !hasKey(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (!hasKey(obj1, key) && hasKey(obj2, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: gendiff(obj1[key], obj2[key]) };
    }
    if (hasKey(obj1, key) && hasKey(obj2, key) && areValuesSame(obj1, obj2, key) === false) {
      return {
        key, type: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });

  return difference;
};

export default gendiff;
// import * as fs from 'node:fs';
import _ from 'lodash';
// import yaml from 'js-yaml';
import parse from './parser.js';

// Работает только с файлами file1.json и file2.json
// не знаю как сделать так, чтобы функция работала и с другими файлами

// Воспользовался советом техподдержки в обсуждениях:

// полученный JSON нужно сначала преобразовать в объект.
// Дальше хорошим решением будет сначала найти объединение всех ключей
// (то есть получить массив всех ключей, которые есть и в первом и во втором объекте).
// А дальше уже пробежаться по этому массиву и смотреть, что стало с каждым из ключей.
// Если ключ есть в первом объекте, но отсутствует во втором - значит удалён.
// Если отсутствует в первом, но есть во втором - добавлен. И так далее

// функция: значения ключей одинаковы?
const areValuesSame = (obj1, obj2, key) => {
  if (obj1[key] === obj2[key]) {
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
const gendiff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  //   if (obj1 === undefined) {
  //   console.log('asdasdasdasd')
  //   }
  //     console.log(obj1);
  //     console.log(obj2);

  // получаю все ключи из двух объектов
  // и оставляю только уникальные ключи
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  //   console.log(uniqKeys);

  // так как ответом должна быть строка, то создаю начало строки
  let obj3 = '{ \n';

  // прохожу по каждому уникальному ключу
  uniqKeys.forEach((key) => {
    if (areValuesSame(obj1, obj2, key) === true) {
    // если значения ключей одинаковы, то добавляю строку без минуса и плюса
      obj3 += `    ${key}: ${obj1[key]} \n`;
    } else if (hasKey(obj1, key) && !hasKey(obj2, key)) {
    // если у объекта 1 есть ключ и у объекта 2 нет ключа, то добавляю строку с минусом
      obj3 += `  - ${key}: ${obj1[key]} \n`;
    } else if (!hasKey(obj1, key) && hasKey(obj2, key)) {
    // если у объекта 1 нет ключа и у объекта 2 есть ключ, то добавляю строку с плюсом
      obj3 += `  + ${key}: ${obj1[key]} \n`;
    } else if (hasKey(obj1, key) && hasKey(obj2, key) && areValuesSame(obj1, obj2, key) === false) {
    // если у объекта 1 и объекта 2 есть ключи и их значения не одинаковы,
    // то добавляю две строки
      obj3 += `  - ${key}: ${obj1[key]} \n`;
      obj3 += `  + ${key}: ${obj2[key]} \n`;
    }
  });

  obj3 += '}';

  return obj3;
};

export default gendiff;

import * as fs from 'node:fs';
import _ from 'lodash';

// не понятно как этим пользоваться
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// работает только с файлами file1.json и file2.json
// не знаю как сделать так, чтобы функция работала и с другими файлами

// Воспользовался советом техподдержки в обсуждениях:

// полученный JSON нужно сначала преобразовать в объект.
// Дальше хорошим решением будет сначала найти объединение всех ключей
// (то есть получить массив всех ключей, которые есть и в первом и во втором объекте).
// А дальше уже пробежаться по этому массиву и смотреть, что стало с каждым из ключей.
// Если ключ есть в первом объекте, но отсутствует во втором - значит удалён.
// Если отсутствует в первом, но есть во втором - добавлен. И так далее


const gendiff = (filepath1, filepath2) => {
  const json1 = fs.readFileSync(filepath1);
  const json2 = fs.readFileSync(filepath2);
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  //   console.log(obj1);
  //   console.log(obj2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  //   console.log(uniqKeys);


// функция для проверки наличия ключа


  let obj3 = '{ \n';
  uniqKeys.forEach((key) => {
    // если значения ключей одинаковы
    if (areValuesSame(obj1, obj2, key) === true) {
      obj3 += `    ${key}: ${obj1[key]} \n`;
    }
	// если у объекта1 есть ключ и у объекта 2 нет ключа
	else if (Object.prototype.hasOwnProperty.call(obj1, key) && !Object.prototype.hasOwnProperty.call(obj2, key)) {
      obj3 += `  - ${key}: ${obj1[key]} \n`;
    } 
	// если у объекта1 нет ключа и у объекта 2 есть ключ
	else if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      obj3 += `  + ${key}: ${obj1[key]} \n`;
    } 
	
	// если у объекта1 и объекта 2 есть ключи и их значения не одинаковы
	else if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
      obj3 += `  - ${key}: ${obj1[key]} \n`;
      obj3 += `  + ${key}: ${obj2[key]} \n`;
    }
  });
  // чтобы избавиться от длинной строки и нечитаемого кода я предлагаю
  // создать тернарную функцию obj1.hasOwnProperty(key)
  //   for (const key of uniqKeys) {
  //   // console.log(obj1[key])
  //     if (obj1[key] === obj2[key]) {
  //       obj3 += `    ${key}: ${obj1[key]} \n`;
  //     } else if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
  //       obj3 += `  - ${key}: ${obj1[key]} \n`;
  //     } else if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
  //       obj3 += `  + ${key}: ${obj1[key]} \n`;
  //     } else if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
  //       obj3 += `  - ${key}: ${obj1[key]} \n`;
  //       obj3 += `  + ${key}: ${obj2[key]} \n`;
  //     }
  //   }

  obj3 += '}';

  return obj3;
};

// функция: значения ключей одинаковы?
const areValuesSame = (obj1, obj2 , key) => {
  if (obj1[key] === obj2[key]) {
    return true
  } else {
    return false
  }
}

export default gendiff;

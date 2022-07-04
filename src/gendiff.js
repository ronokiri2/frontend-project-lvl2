import * as fs from 'node:fs';
import _ from 'lodash'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const gendiff = (filepath1, filepath2) => {
  const json1 = fs.readFileSync(filepath1);
  const json2 = fs.readFileSync(filepath2);
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  console.log(obj1);
  console.log(obj2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  console.log(uniqKeys);

  let obj3 = '{ \n'
  for (const key of uniqKeys) {
	console.log(obj1[key])

	if (obj1[key] === obj2[key]) {
		obj3 += `    ${key}: ${obj1[key]} \n`;
	}

	else if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
		obj3 += `  - ${key}: ${obj1[key]} \n`;
	}

	else if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
		obj3 += `  + ${key}: ${obj1[key]} \n`;
	}

	else if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
		obj3 += `  - ${key}: ${obj1[key]} \n`;
		obj3 += `  + ${key}: ${obj2[key]} \n`;
	}

  }

	obj3 += '}'

	// полученный JSON нужно сначала преобразовать в объект. Дальше хорошим решением будет сначала найти объединение всех ключей (то есть получить массив всех ключей, которые есть и в первом и во втором объекте). А дальше уже пробежаться по этому массиву и смотреть, что стало с каждым из ключей. 
	// Если ключ есть в первом объекте, но отсутствует во втором - значит удалён. Если отсутствует в первом, но есть во втором - добавлен. И так далее

  return obj3;
};







export default gendiff;

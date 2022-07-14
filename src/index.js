// import * as fs from 'node:fs';
// import _ from 'lodash';
// import yaml from 'js-yaml';
import parse from './parser.js';
import checkUpdates from './checkUpdates.js';
import createTxt from './createTxt.js';

// нужно получить инфу из файлов
const getInfo = (filepath) => parse(filepath);

// запускающая функция
// 1) получает инфу из файлов в виде объектов
// 2) получает разницу в этих объектах
// 3) получает сгенерированную строку
// 4) возвращает строку
const gendiff = (filepath1, filepath2, format = 'stylish') => {
  console.log('ahahahah');
  const obj1 = getInfo(filepath1);
  const obj2 = getInfo(filepath2);
  const difference = checkUpdates(obj1, obj2);
  const createdTxt = createTxt(difference, format);
  return createdTxt;
};

export default gendiff;

// import * as fs from 'node:fs';
// import _ from 'lodash';
// import yaml from 'js-yaml';
import parse from './parser.js';
import makeDiff from './checkUpdates.js';
import chooseStyle from './formatters/index.js';

const getInfo = (filepath) => parse(filepath);

// запускающая функция
// 1) получает контент из файлов в виде объектов
// 2) получает разницу в этих объектах
// 3) получает сгенерированную строку
// 4) возвращает сгенерированную строку
const gendiff = (filepath1, filepath2, format) => {
  const obj1 = getInfo(filepath1);
  const obj2 = getInfo(filepath2);
  const difference = makeDiff(obj1, obj2);
  const createdTxt = chooseStyle(difference, format);
  return createdTxt;
};

export default gendiff;

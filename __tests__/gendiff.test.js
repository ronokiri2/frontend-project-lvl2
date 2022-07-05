import path from 'path';
import fs from 'fs';
import gendiff from '../src/gendiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

test('1', () => {
  const json3 = readFile('file3.json');
  const json4 = readFile('file4.json');

  const obj3 = JSON.parse(json3);
  const obj4 = JSON.parse(json4);

  expect(gendiff(obj3, obj4)).toEqual('expected');
});

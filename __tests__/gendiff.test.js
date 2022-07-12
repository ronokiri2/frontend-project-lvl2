import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const fileOutput = readFile('fileOutput.txt');
const fileOutputNested = readFile('fileOutputNested.txt');

test('gendiff file1 + file2 = fileOutput', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(fileOutput);
});

test('gendiff file1.yml + file2.yml = fileOutput', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(fileOutput);
});

test('gendiff nested file3 file4', () => {
  expect(gendiff('file3.json', 'file4.json')).toEqual(fileOutputNested);
});

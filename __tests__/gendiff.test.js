import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const file1 = readFile('file1.json');
const file2 = readFile('file2.json');
const fileOutput = readFile('fileOutput.json');
// const fileOutput = readFileSync(getFixturePath('fileOutput.json'));
// const dataFileOutput = readFile(pathFileOutput, { encoding: 'utf8', flag: 'r' });

test('gendiff file1 + file2 = fileOutput', () => {
  expect(gendiff(file1, file2)).toBe(fileOutput);
});

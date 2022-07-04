import * as fs from 'node:fs';

const gendiff = (filepath1, filepath2) => {
  const json1 = fs.readFileSync(filepath1);
  const json2 = fs.readFileSync(filepath2);
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  console.log(obj1);
  return obj2;
};
export default gendiff;

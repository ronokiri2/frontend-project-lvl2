import * as fs from 'node:fs';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const fileExtension = filepath.split('.').pop(); // "json"

  // превращаю json файлы в объекты
  if (fileExtension === 'json') {
    const json = fs.readFileSync(filepath);
    const obj = JSON.parse(json);
    return obj;
  }
  if (fileExtension === 'yml' || fileExtension === 'yaml') {
    const obj = yaml.load(fs.readFileSync(filepath));
    return obj;
  }
  return null;
};
// const parse = (filepath1, filepath2) => {
//   const fileExtension1 = filepath1.split('.').pop(); // "json"
//   const fileExtension2 = filepath2.split('.').pop(); // "yml"

//   console.log(fileExtension1);
//   // превращаю json файлы в объекты
//   if (fileExtension1 === 'json' && fileExtension2 === 'json') {
//     console.log('both json');
//     const json1 = fs.readFileSync(filepath1);
//     const json2 = fs.readFileSync(filepath2);
//     const obj1 = JSON.parse(json1);
//     const obj2 = JSON.parse(json2);
//     return { obj1, obj2 };
//   }
//   if (fileExtension1 === 'yml' && fileExtension2 === 'yml') {
//     console.log('both yml');
//     const yaml1 = yaml.load(fs.readFileSync(filepath1));
//     const yaml2 = yaml.load(fs.readFileSync(filepath2));
//     const obj1 = JSON.parse(yaml1);
//     const obj2 = JSON.parse(yaml2);
//     return { obj1, obj2 };
//   }
// };

export default parse;

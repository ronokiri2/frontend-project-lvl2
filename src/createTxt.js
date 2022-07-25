import _ from 'lodash';

const spaces = (depth) => {
  const symbol = ' ';
  const space = symbol.repeat(depth * 4 - 2);
  return space;
};

const stringify = (elem, depth) => {
  if (!_.isObject(elem)) {
    return elem;
  }
  const str = Object.entries(elem).map(([key, value]) => {
    const stringifiedValue = stringify(value, depth + 1);
    const stringWithKey = `${spaces(depth + 1)}  ${key}: ${stringifiedValue}`;
    return stringWithKey;
  });
  const stringWithBrackets = `{\n${str}\n${spaces(depth)}}`;
  return stringWithBrackets;
};

const createNestedTxt = (difference) => {
  const iter = (node, depth) => {
    const status = node.type;

    switch (status) {
      case 'root':
        return `{\n${node.children.map((child) => iter(child, depth + 1)).join('\n')}\n}`;

      case 'nested': {
        // const value = `\n${node.children.map((child) => iter(child, depth + 1)).join('\n')}}`;
        const value = node.children.map((child) => iter(child, depth + 1));
        const joinedValue = value.join('\n');
        const valueWithBrackets = `{\n${joinedValue}\n${spaces(depth)}  }`;
        return `${spaces(depth)}  ${node.key}: ${valueWithBrackets}`;
      }
      case 'added': {
        const value2 = stringify(node.value, depth);
        return (`${spaces(depth)}+ ${node.key}: ${value2}`);
      }
      case 'deleted': {
        const value3 = stringify(node.value, depth);
        return (`${spaces(depth)}- ${node.key}: ${value3}`);
      }
      case 'unchanged': {
        const value4 = stringify(node.value, depth);
        return (`${spaces(depth)}  ${node.key}: ${value4}`);
      }
      case 'changed': {
        const valueBefore = stringify(node.valueBefore, depth);
        const valueAfter = stringify(node.valueAfter, depth);
        return (`${spaces(depth)}- ${node.key}: ${valueBefore}\n${spaces(depth)}+ ${node.key}: ${valueAfter}`);
      }
      default:
        console.log('error in switch case');
    }
  };

  return iter(difference, 0);
  // difference.forEach((obj) => {
  //   if (obj.type === 'root') {
  //     result.push(`${spaces}  ${obj.key}: ${obj.value}\n`);
  //   } else if (obj.type === 'unchanged') {
  //     result.push(`${spaces}  ${obj.key}: ${obj.value}\n`);
  //   } else if (obj.type === 'deleted') {
  //     result.push(`${spaces}- ${obj.key}: ${obj.value}\n`);
  //   } else if (obj.type === 'added') {
  //     result.push(`${spaces}+ ${obj.key}: ${obj.value}\n`);
  //   } else if (obj.type === 'changed') {
  //     result.push(`${spaces}- ${obj.key}: ${obj.valueBefore}\n`);
  //     result.push(`${spaces}+ ${obj.key}: ${obj.valueAfter}\n`);
  //   } else if (obj.type === 'nested') {
  //     result.push(`${spaces}  ${obj.key}: {\n`);
  //     const a = createNestedTxt(obj.children, depth + 1);
  //     // console.log('top');
  //     result.push(a);
  //     result.push(`${spaces}\n`);
  //     // result += createNestedTxt(obj.value, depth + 4);
  //   } else if (_.isPlainObject(obj.children)) {
  //     result.push(`${spaces}  ${obj.key}: {\n`);
  //     const b = createNestedTxt(stringifyObject(obj.value, depth + 1));
  //     result.push(b);
  //     result.push(`${spaces}\n`);
  //     // result += createNestedTxt(obj.value, depth + 4);
  //   }
  // });
};

export default createNestedTxt;

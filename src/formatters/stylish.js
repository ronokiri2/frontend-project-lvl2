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
  const stringWithBrackets = `{\n${str.join('\n')}\n${spaces(depth)}  }`;
  return stringWithBrackets;
};

const stylish = (difference) => {
  const iter = (node, depth) => {
    const status = node.type;

    switch (status) {
      case 'root':
        return `{\n${node.children.map((child) => iter(child, depth + 1)).join('\n')}\n}`;

      case 'nested': {
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
        const stringBefore = `${spaces(depth)}- ${node.key}: ${valueBefore}`;
        const stringAfter = `${spaces(depth)}+ ${node.key}: ${valueAfter}`;
        return (`${stringBefore}\n${stringAfter}`);
      }
      default:
        console.log('error in switch case');
    }
    return 'gh';
  };

  return iter(difference, 0);
};

export default stylish;

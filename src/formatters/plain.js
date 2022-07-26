import _ from 'lodash';

const getName = (path, name) => [...path, name].join('.');

const stringify = (elem) => {
  if (elem === null) {
    return null;
  }
  if (_.isString(elem)) {
    return `'${elem}'`;
  }
  if (_.isObject(elem)) {
    return '[complex value]';
  }
  return elem;
};

const iter = (node, path) => {
  const status = node.type;

  switch (status) {
    case 'root': {
      return node.children.flatMap((child) => iter(child, ''));
    }
    case 'nested': {
      return node.children.flatMap((child) => iter(child, [...path, node.key]));
    }
    case 'deleted': {
      const prop = getName(path, node.key);
      return `Property '${prop}' was removed`;
    }
    case 'added': {
      const prop = getName(path, node.key);
      const value = stringify(node.value);
      return `Property '${prop}' was added with value: ${value}`;
    }
    case 'changed': {
      const prop = getName(path, node.key);
      const valueBefore = stringify(node.valueBefore);
      const valueAfter = stringify(node.valueAfter);
      return `Property '${prop}' was updated. From ${valueBefore} to ${valueAfter}`;
    }
    case 'unchanged': {
      return [];
    }
    default: {
      console.log('🌳 🌲');
    }
  }
//   return 'error'
};

const plain = (difference) => {
  const result = iter(difference, []).join('\n');
  return result;
};

export default plain;

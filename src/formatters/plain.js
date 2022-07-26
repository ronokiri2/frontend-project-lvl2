import _ from 'lodash';

const getName = (path, name) => [...path, name].join('.');

const stringify = (elem) => {
  if (!_.isObject(elem)) {
    return elem;
  }
  if (_.isObject(elem)) {
    return '[complex value]';
  }
};

const iter = (node, path) => {
  const status = node.type;

  switch (status) {
    case 'root': {
      return node.children.flatMap((child) => iter(child, ''));
    }
    case 'deleted': {
      const prop = getName(path, node.key);
      return `Property '${prop}' was removed`;
    }
    case 'added': {
      const prop = getName(path, node.key);
      return `Property '${prop}' was added with value '${node.value}'`;
    }
    case 'changed': {
      const prop = getName(path, node.key);
      return `Property '${prop}' was updated. From '${node.valueBefore}' to '${node.valueAfter}'`;
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

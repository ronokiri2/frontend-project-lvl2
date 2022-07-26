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
      console.log(`Property ${prop} was removed`);
      break;
    }
    case 'added': {
      const prop = getName(path, node.key);
      console.log(`Property ${prop} was added with value ${prop}`);
      break;
    }
    case 'changed': {
      const prop = getName(path, node.key);
      console.log(`Property ${prop} was updated. From ${prop} to ${prop}`);
      break;
    }
    case 'unchanged': {
      const prop = getName(path, node.key);
      console.log(`Property ${prop} was same`);
      break;
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

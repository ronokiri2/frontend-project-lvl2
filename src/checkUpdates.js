import _ from 'lodash';

const gendiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  const sortedUniqKeys = _.sortBy(uniqKeys);

  const difference = sortedUniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: value1,
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: gendiff(value1, value2),
      };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        valueBefore: value1,
        valueAfter: value2,
      };
    }
    return {
      key,
      type: 'unchanged',
      value: value1,
    };
  });

  return difference;
};

const makeDiff = (obj1, obj2) => {
  const differenceWrapper = {
    type: 'root',
    children: gendiff(obj1, obj2),
  };

  return differenceWrapper;
};

export default makeDiff;

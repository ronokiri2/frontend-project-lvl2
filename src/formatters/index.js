import stylish from './stylish.js';

const chooseStyle = (difference, format = stylish) => {
  if (format === stylish) {
    return stylish(difference);
  }
  return 'error in chooseStyle: format is not stylish';
};

export default chooseStyle;

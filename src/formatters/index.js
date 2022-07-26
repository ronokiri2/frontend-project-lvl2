import stylish from './stylish.js';
import plain from './plain.js';

const chooseStyle = (difference, format = plain) => {
  if (format === stylish) {
    return stylish(difference);
  }
  if (format === plain) {
    return plain(difference);
  }
  return 'error in chooseStyle: format is not stylish';
};

export default chooseStyle;

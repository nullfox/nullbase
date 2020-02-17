import { Dimensions } from 'react-native';

const GUIDE_DIMENSION = {
  HEIGHT: 680,
  WIDTH: 350,
};

const DEFAULT_FONT_SIZE = ((dimensions) => {
  if (dimensions.width < GUIDE_DIMENSION.WIDTH) {
    return 14;
  }

  return 16.5;
})(Dimensions.get('window'));

const { width, height } = Dimensions.get('window');

// Scales (Good for views)
const scale = size => width / GUIDE_DIMENSION.WIDTH * size;
const verticalScale = size => height / GUIDE_DIMENSION.HEIGHT * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// REM (Good for text)
const rem = (value, defaultRem = DEFAULT_FONT_SIZE) => parseFloat(value, 10) * defaultRem;

const percentHeight = float => height * (float / 100);
const percentWidth = float => width * (float / 100);

const calculateSizeValue = (val) => {
  if (typeof val === 'string' && val.endsWith('%h')) {
    return percentHeight(parseFloat(val.replace('%h', '')));
  }

  if (typeof val === 'string' && val.endsWith('%w')) {
    return percentWidth(parseFloat(val.replace('%w', '')));
  }

  if (typeof val === 'string' && val.endsWith('%')) {
    return val;
  }

  return parseFloat(val);
};

const parsePaddingMargin = (val, type = 'padding') => {
  let numbers = [];

  if (typeof val === 'string') {
    numbers = val.split(' ').map(block => calculateSizeValue(block));
  } else {
    numbers = [val, val, val, val];
  }

  if (numbers.length === 1) {
    return {
      [type]: numbers[0],
    };
  }

  if (numbers.length === 2) {
    return {
      [`${type}Vertical`]: numbers[0],
      [`${type}Horizontal`]: numbers[1],
    };
  }

  if (numbers.length === 4) {
    return {
      [`${type}Top`]: numbers[0],
      [`${type}Right`]: numbers[1],
      [`${type}Bottom`]: numbers[2],
      [`${type}Left`]: numbers[3],
    };
  }

  throw new Error(`${val} is not a valid margin/padding value`);
};

export {
  DEFAULT_FONT_SIZE,
  GUIDE_DIMENSION,

  width,
  height,

  scale,
  verticalScale,
  moderateScale,

  rem,
  percentHeight,
  percentWidth,

  calculateSizeValue,
  parsePaddingMargin,
};
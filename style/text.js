import { rem } from './size';

let defaultStyles = {
  color: 'rgb(35,35,35)',
  // fontFamily: 'Soleil',
  fontSize: rem(1),
  // lineHeight: rem(1.2),
};

export default class Text {
  styles = { ...defaultStyles };

  static getDefaultStyles() {
    return defaultStyles;
  }

  static setDefaultStyles(styles = {}) {
    defaultStyles = {
      ...defaultStyles,
      ...styles,
    };
  }

  static factory() {
    return new Text();
  }

  addStyle(key, value) {
    this.styles[key] = value;

    return this;
  }

  removeStyle(key) {
    delete this.styles[key];

    return this;
  }

  toObject() {
    return this.styles;
  }

  omit(key) {
    return this.removeStyle(key);
  }

  darkColor() {
    return this.color('#333333');
  }

  mediumColor() {
    return this.color('#777777');
  }

  lightColor() {
    return this.color('#f1f1f1');
  }

  color(color) {
    return this.addStyle('color', color);
  }

  font(family) {
    return this.addStyle('fontFamily', family);
  }

  thin() {
    return this.addStyle('fontWeight', '300');
  }

  regular() {
    return this.addStyle('fontWeight', '400');
  }

  bold() {
    return this.addStyle('fontWeight', '700');
  }

  extraBold() {
    return this.addStyle('fontWeight', '800');
  }

  underline() {
    return this.addStyle('textDecorationLine', 'underline');
  }

  center() {
    return this.addStyle('textAlign', 'center');
  }

  right() {
    return this.addStyle('textAlign', 'right');
  }

  size(val, matchLineHeight = false) {
    let size = val;

    if (val.indexOf && val.indexOf('rem') !== -1) {
      size = rem(val);
    }

    if (matchLineHeight === true) {
      this.addStyle('lineHeight', size + 1);
    }

    return this.addStyle('fontSize', size);
  }

  lineHeight(val) {
    let height = val;

    if (val.indexOf && val.indexOf('rem') !== -1) {
      height = rem(val);
    }

    return this.addStyle('lineHeight', height);
  }

  reset() {
    this.styles = { ...defaultStyles };

    return this;
  }
}
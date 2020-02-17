import Color from 'color';

const palette = new Map();

palette.set('topInset', 'white');

const operation = op => (
  (color, amount) => Color(color)[op](amount).hsl().toString()
);

const darken = operation('darken');
const lighten = operation('lighten');
const fade = operation('fade');
const alpha = operation('alpha');

export {
  palette,
  darken,
  lighten,
  fade,
  alpha,
};

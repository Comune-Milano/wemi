/** @format */

const size = {
  icon: '6rem',
  iconnested: '3rem',
  f0: '3rem',
  f1: '2.5rem',
  f2: '2.2rem',
  f3: '2.15rem',
  f4: '1.875rem',
  f5: '1.46rem',
  f6: '1.105rem',
  f7: '1rem',
  f7_5: '0.9rem',
  f8: '.785rem',
  f9: '.71rem',
  f10: '.63rem',
};
const align = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
};
const transform = {
  lowercase: 'lowercase',
  uppercase: 'uppercase',
  capitalize: 'capitalize',
  none: 'none',
};

const weight = {
  lighter: '100',
  light: '300',
  normal: '500',
  semiBold: '600',
  bold: '700',
  bolder: '900',
};

export const valuesSize = Object.keys(size);
export const valuesAlign = Object.keys(align);
export const valuesTransform = Object.keys(transform);
export const valuesWeight = Object.keys(weight);
export const valuesTag = ['h1', 'h2', 'h3', 'p', 'span'];

export default {
  size,
  align,
  transform,
  weight,
};

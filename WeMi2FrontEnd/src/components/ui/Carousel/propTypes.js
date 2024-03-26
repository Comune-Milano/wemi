/** @format */

import exact from 'prop-types-exact';
import PropTypes from 'prop-types';

const CarouselPropTypes = exact({
  carouselItem: PropTypes.object,
  dots: PropTypes.object,
  height: PropTypes.string,
  arrowbgcolor: PropTypes.string,
  arrowcolor: PropTypes.string,
  arrowSize: PropTypes.string,
  arrowWrapperSize: PropTypes.string,
  caption: PropTypes.func,
});

export default CarouselPropTypes;

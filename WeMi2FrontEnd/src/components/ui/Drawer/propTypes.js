/** @format */

import exact from 'prop-types-exact';
import PropTypes from 'prop-types';

const DrawerPropTypes = exact({
  headerValue: PropTypes.object,
  bodyValue: PropTypes.object,
  from: PropTypes.object,
  iconcolor: PropTypes.string,
  headerBgColor: PropTypes.string,
  open: PropTypes.bool,
  openDrawer: PropTypes.bool,
  header: PropTypes.func,
  body: PropTypes.func,
});

export default DrawerPropTypes;

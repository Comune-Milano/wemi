/** @format */

import exact from 'prop-types-exact';
import PropTypes from 'prop-types';

const HomePagePropTypes = exact({
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  staticContext: PropTypes.object,
});

export default HomePagePropTypes;

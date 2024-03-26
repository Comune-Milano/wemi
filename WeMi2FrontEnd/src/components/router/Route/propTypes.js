/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const RoutePropTypes = exact({
  component: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  computedMatch: PropTypes.shape({
    params: PropTypes.shape(
      exact({
        locale: PropTypes.string.isRequired,
        idLoan: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  handleLocaleChange: PropTypes.func.isRequired,
  handlePathnameChange: PropTypes.func.isRequired,
  render: PropTypes.func,
  exact: PropTypes.bool,
  dispatch: PropTypes.func,
  path: PropTypes.string.isRequired,
});

export default RoutePropTypes;

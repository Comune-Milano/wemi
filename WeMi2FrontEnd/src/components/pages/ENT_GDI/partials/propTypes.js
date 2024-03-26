/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const TablePropTypes = exact({
  Colonne: PropTypes.objectOf(JSON).isRequired,
  Righe: PropTypes.objectOf(JSON).isRequired,
  onClick: PropTypes.func,
});

export default TablePropTypes;

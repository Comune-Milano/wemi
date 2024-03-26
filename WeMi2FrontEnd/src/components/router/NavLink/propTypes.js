/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { valuesTranslations } from 'i18n';

const NavLinkPropTypes = exact({
  children: PropTypes.node.isRequired,
  locale: PropTypes.oneOf(valuesTranslations).isRequired,
  primary: PropTypes.bool,
  to: PropTypes.string.isRequired,
});

export default NavLinkPropTypes;

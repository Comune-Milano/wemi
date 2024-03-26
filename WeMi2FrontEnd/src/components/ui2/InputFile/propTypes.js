import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  maxDimension: PropTypes.number,
  color: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
  intl: PropTypes.object,
  intlLabel: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default propTypes;

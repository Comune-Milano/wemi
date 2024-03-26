import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  size: PropTypes.string,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  margin: PropTypes.string,
};

export default propTypes;

import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
  afterVaue: PropTypes.string,
  size: PropTypes.string,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  margin: PropTypes.string,
};

export default propTypes;

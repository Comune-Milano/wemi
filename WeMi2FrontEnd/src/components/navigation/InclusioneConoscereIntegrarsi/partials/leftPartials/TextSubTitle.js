import React from 'react';
import Text from 'components/ui/Text';

const TextSubTitle = ({
  value,
  size = "f6",
  weight = "bold",
  transform = "uppercase",
  lineHeight = "175%",
  color = "blue",
  letterSpacing = "0.05em",
}) => (
  <Text
    value={value}
    size={size}
    weight={weight}
    transform={transform}
    lineHeight={lineHeight}
    color={color}
    letterSpacing={letterSpacing}
  />
);

TextSubTitle.displayName = 'TextSubTitleNavigation';

export default TextSubTitle;
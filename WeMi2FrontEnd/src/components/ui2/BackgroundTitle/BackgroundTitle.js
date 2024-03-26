import React from 'react';
import { StyledWrapper, StyledText } from './BackgroundTitle.styled';
import { stylingBySize } from './constants';

const BackgroundTitle = ({
  tag = 'span',
  color ='white',
  fontWeight = 'bold',
  transform = 'uppercase',
  whiteSpace = 'pre-wrap',
  textAlign,
  label,
  bgColor,
  size,
}) => {
  const {
    fontSize,
    letterSpacing,
    lineHeight,
    padding,
  } = stylingBySize[size];

  return (
    <StyledWrapper textAlign={textAlign}>
      <StyledText
        whitespace={whiteSpace}
        weight={fontWeight}
        transform={transform}
        color={color}
        bgcolor={bgColor}
        value={label}
        tag={tag}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        padding={padding}
        size={fontSize}

      />
    </StyledWrapper>
  );
};

BackgroundTitle.displayName = 'BackgroundTitle';
export default BackgroundTitle;

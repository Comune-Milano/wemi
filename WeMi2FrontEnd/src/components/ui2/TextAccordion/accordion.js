import React from 'react';
import styled from 'styled-components';
import { fonts, colors } from 'theme';
import Text from 'components/ui/Text';
import { isFunction } from 'utils/functions/typeCheckers';
import AnimateHeight from 'react-animate-height';
import FaIcon from '../FaIcon';

const WrapperAccordionBody = styled.div`
  padding: 0.5rem 2rem;
`;

const StyledAccordion = styled.div`
  width: 100%;
  height: auto;
  margin: ${props => props?.margin};

  h5 {
      transition: opacity .2 ease-in;
      &:hover {
          opacity: .85;
          transition: opacity .2 ease-out;
      }
  }

  > div {
      &:first-child {
          width: fit-content;
          display: flex;
          align-items: flex-start;
      }
  }
`;

const ArrowContainer = styled.div`
  i {
    transform: ${props => props.open ? 'rotate(90deg)' : 'rotate(0deg)'};
    transition: transform .2s ease-in-out;
  }
`;


const StyledButton = styled.button`
  display: inline-block;
  text-align: left;
  align-items: center;
  display: flex;
  cursor: pointer;
  background-color: unset;
  box-sizing: border-box;
  margin: 0;
  padding: ${properties => properties.padding || "4px"};
  border-width: 0;
  border-style: unset;
  border-color: unset;
  border-image: none;
  &:focus {
    outline: none;
    /* border: 1px solid #0099ab; */
    /* border-radius: 2px; */
  }
`;


const TextAccordionControllable = ({
  label,
  size,
  color,
  weight,
  labelTransform,
  labelLetterSpacing,
  maxheight,
  children,
  nearTitle,
  forwardRef,
  tabIndex,
  visibility,
  onVisible,
  onUnvisible,
  margin,
  padding,
  ...rest
}) => {
  const handleVisibility = () => {
    if (visibility && isFunction(onUnvisible)) {
      return onUnvisible(!visibility);
    }

    return onVisible(!visibility);
  };

  return (
    <StyledAccordion
      ref={forwardRef}
      margin={margin}
      {...rest}
    >
      <StyledButton
        type="button"
        tabIndex={tabIndex}
        onClick={handleVisibility}
        color={color}
        padding={padding}
      >
        <ArrowContainer
          open={visibility}
        >
          <FaIcon
            fontSize="f7"
            icon="chevron-right"
            color={color}
          />
        </ArrowContainer>
        <Text
          value={label}
          size={size}
          color={color}
          weight={weight || 'bold'}
          transform={labelTransform}
          letterSpacing={labelLetterSpacing}
          padding="0 0 0 1em"
        />
      </StyledButton>
      {nearTitle || null}
      <AnimateHeight
        duration={500}
        height={visibility ? 'auto' : 0}
      >
        <WrapperAccordionBody
          role="region"
          aria-expanded={visibility}
          maxheight={maxheight}
          open={visibility}
        >
          {children}
        </WrapperAccordionBody>
      </AnimateHeight>
    </StyledAccordion>
  );
};

TextAccordionControllable.displayName = 'Visual text accordion';

export default TextAccordionControllable;

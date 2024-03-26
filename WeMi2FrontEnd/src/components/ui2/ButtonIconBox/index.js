import React from 'react';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import { withRouter } from 'react-router-dom';

const StyledBox = styled.div`
  text-align: center;
  width: 100%;

  img {
    width: 100%;
    height: auto;
    min-height: 3.5rem;
    margin-bottom: ${props => props.marginBottom};
    transition: all .2s ease-in-out;
    &:hover, &:focus {
      transform: scale(1.1, 1.1);
    }

    ${media.xs`
      min-width: ${props => props.maxWidth.xs};
      max-width: ${props => props.maxWidth.xs};
    `};

    ${media.sm`
      min-width: ${props => props.maxWidth.sm};
      max-width: ${props => props.maxWidth.sm};
    `}

    ${media.md`
      min-width: ${props => props.maxWidth.md};
      max-width: ${props => props.maxWidth.md};
    `};

    ${media.lg`
      min-width: ${props => props.maxWidth.lg};
      max-width: ${props => props.maxWidth.lg};
    `};
  }
`;

const ButtonIconBox = ({
  title,
  media,
  isOnly018 = false,
  history,
  link,
  alt,
  marginBottom = '1em',
  maxWidth = {
    xs: '13.3rem',
    sm: '12.8rem',
    md: '12.5rem',
    lg: '12.5rem',
  },
  letterSpacing = '0.05em',
  lineHeight = '150%',
}) => (
  <StyledBox
    maxWidth={maxWidth}
    marginBottom={marginBottom}
    onClick={() => { history.push(link, { isOnly018 }); }}
  >
    <img
      src={media}
      alt={alt}
      height="auto"
      width="auto"
    />
    <Text
      tag="p"
      value={title}
      size="f7_5"
      color="black"
      transform="uppercase"
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
    />
  </StyledBox>
);

ButtonIconBox.displayName = 'ButtonIconBox';

export default withRouter(ButtonIconBox);

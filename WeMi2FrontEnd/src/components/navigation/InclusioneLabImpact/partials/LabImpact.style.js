import styled from 'styled-components';
import { colors, fonts } from 'theme';

export const StyledTitle = styled.div`
  > span {
    -webkit-box-decoration-break: clone;
    white-space: pre-line;
    line-height: 2;
    letter-spacing: 0.05em;
    font-weight: 700;
    background-color: ${props => colors[props.color]};
    font-weight: semi-bold;
    font-size: ${fonts.size.f5};
    color: white;
    padding: 0.2em 0.5em;
  }
`;

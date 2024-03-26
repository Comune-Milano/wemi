import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';

export const OfficeDiv = styled.div`
    border: 2px solid ${colors.blue};
    padding: 1rem;
    width: 100%;
    ${props => props.disabled ? css`
      pointer-events: none;
      border: 2px solid ${colors.grey};
    ` : ''}
  `;

export const P = styled.p`
    font-size: ${fonts.size.f5};
    width: 100%;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
    color: ${colors.darkGrey};
`;

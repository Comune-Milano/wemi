
import styled, { css } from 'styled-components';
import { colors } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { Column } from 'components/ui/Grid';

export const ColumnEnteName = styled(Column)`
  flex: 1;
`;

export const WrapperSocial = styled.span`
  padding: 0 0.6rem 0 0;
`;

export const Card = styled.div`
  position: relative;
  padding: 0 1.2em 0.8em 1.2em;
  transition: background-color 0.2s linear;
  background-color: transparent;
  cursor: pointer;

  div.ent-header {
    border-top: 2px solid ${colors.darkGrey};
    padding-top: 1em

    label {
      padding-left: 1em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: 100%;
    };

    .header-buttons > div {
      margin-left: 1em;
    }

  }

  small.ent-details ul {
    margin-left: 2.5em;
    font-style: italic;

    li {
      padding-top: 2px;
    }
  }

  div.ent-body {
    padding-top: 1.2em;

    div.price {
      display: inline-block;
      font-weight: 700;
      line-height: 1.4;

      small {
        font-weight: 500;
        display: block;
      }
    }

    div.modal-buttons {
      > div {
        width: 100%;
        max-width: 12rem;

        &:last-child {
          margin-left: 0.5em;
        }
      }
    }
  }

  div.ent-footer {
    padding-top: 1em;

    a.reviews {
      display: inline-block;
      margin: 0 1em;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: ${colors.black};
      }
    }

    span.rating {
      display: inline-block;
    }
  }
  ${props =>
    props.selected &&
    css`
      transition: background-color 0.2s linear;
      background-color: ${props => props.backgroundColor ?
        props.backgroundColor
        : hexToRgba(colors.primary, 0.15)}
    `}
`;

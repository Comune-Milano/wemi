import { colors } from 'theme';
import styled, { css } from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { hexToRgba } from 'utils/functions/hexToRgba';
import media from 'utils/media-queries';

export const RowBorder = styled(Row)`
  border: 1.5px solid ${colors.greyInput};
`;

export const ColumnBorder = styled(Column)`
  border-right: ${props => props.right ? `1.5px solid ${colors.greyInput}` : ``};
  border-left: ${props => props.left ? `1.5px solid ${colors.greyInput}` : ``};
  border-top: ${props => props.top ? `1.5px solid ${colors.greyInput}` : ``};
  border-bottom: ${props => props.bottom ? `1.5px solid ${colors.greyInput}` : ``};
  height: ${props => props.height};
`;
export const WrapperVertical = styled.span`
  ${
    props => props.vertical ?
      `writing-mode: tb-rl;
      filter: flipv fliph;`
      : null
  }
  margin: ${props => props.margin};
`;

export const ColumnBackgroundBorder = styled(Column)`
  ${props => props.background && `background-color: ${hexToRgba(colors.blue, 0.2)};`}
  ${props => props.right && `border-right: 1.5px solid ${colors.blue};`}
  ${props => props.bottom && `border-bottom: 1.5px solid ${colors.blue};`}
  ${props => props.bottomGrey && `border-bottom: 1.5px solid ${colors.grey};`}
  height: 3.4em;
  display: inline-block;
  float: none;
  ${media.lg`
    ${
      props => props.widthLg ?
      css`width: 20%;`
      : css``
    } 
  `}
  ${media.md`
    ${
      props => props.widthMd ?
      css`width: 20%;`
      : css``
    }
  `}
`;

export const ColumnBorderBottom = styled(Column)`
  border-bottom: 1.5px solid ${props => colors[props.borderColor]};
  display: inline-block;
  height: 3.4em;
  ${media.lg`
    width: 20%; 
  `}
  ${media.md`
    width: 20%; 
  `}
`;

export const WrapperText = styled(Row)`
  height: ${props => props.height};
`;

export const RowNowrap = styled(Row)`
  white-space: nowrap;
  display: block;
`;

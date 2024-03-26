import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';

export const RowBorder = styled(Row)`
  border-bottom: ${props => `${props.borderSize} solid  ${colors[props.borderColor]}`};
  &:last-child {
      border-bottom: 0px;
    }
`;

export const ColumnBorderBg = styled(Column)`
  border-bottom: ${props => `${props.borderSize} solid  ${colors[props.borderColor]}`};
  ${props => props.height ?
    `height: ${props.height} ;`
    :
    `min-height: 6em;`
  }
  background-color: ${props => props.opacity ?
    hexToRgba(colors[props.color], 0.2)
    : colors[props.color]
  };
  word-break: break-word;
`;
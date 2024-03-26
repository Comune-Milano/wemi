import { Column } from 'components/ui/Grid';
import styled, { css } from 'styled-components';
import { colors } from 'theme';

export const ColumnBorder = styled(Column)`
  border-right: ${props => props.right ? `${props.height || css`1.5px`} solid ${props.color ? colors[props.color] : colors.greyInput}` : ''};
  border-left: ${props => props.left ? `${props.height || css`1.5px`} solid ${props.color ? colors[props.color] : colors.greyInput}` : ''};
  border-top: ${props => props.top ? `${props.height || css`1.5px`} solid ${props.color ? colors[props.color] : colors.greyInput}` : ''};
  border-bottom: ${props => props.bottom ? `${props.height || css`1.5px`} solid ${props.color ? colors[props.color] : colors.greyInput}` : ''};
  width: ${props => props.width || css`100%`};
  padding: ${props => props.padding || css`0`};
`;

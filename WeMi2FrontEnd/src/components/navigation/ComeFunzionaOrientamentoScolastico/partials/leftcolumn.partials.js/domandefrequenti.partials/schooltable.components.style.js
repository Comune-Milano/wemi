import styled from 'styled-components';
import { colors, fonts } from 'theme';

export const Table = styled.table`
  width:100%;
`;
export const TableXs = styled.table`
  border: 1.5px solid ${colors.greyFooter};
  width:100%;
`;

export const StyledSolidTr = styled.tr`
  border-bottom: 1.5px solid ${colors.greyFooter};
`;

export const BorderSolidTr = styled.tr`
  border-bottom: 1.5px solid ${colors.greyFooter}
`;

export const StyledDashedTr = styled.tr`
  border-bottom: 1.5px dashed ${colors.greyFooter};
`;

export const BorderRightTd = styled.td`
  border-right: 1.5px solid ${colors.greyFooter};
`;

export const CicleColumn = styled.td`
  border-right: 1.5px solid ${colors.greyFooter};
  padding: 8px;
  text-align: center;
`;

export const BlackFontTd = styled.td`
  font-size: ${fonts.size.f6};
  padding: 6px;
  text-align: center;
  vertical-align: middle;
`;

export const PurpleFontTd = styled.td`
  font-size: ${fonts.size.f6};
  color: ${colors.purple};
  padding: 8px;
`;

export const StyledTd = styled.td`
  width: ${props => props.width ? props.width : ''};
  border-left: ${props => props.borderLeft ? props.borderLeft : ''};
  border-bottom: ${props => props.borderBottom ? props.borderBottom : ''};
  border-right: ${props => props.borderRight ? props.borderRight : ''};
  padding: ${props => props.padding ? props.padding : ''};
  color: ${props => props.color ? props.color : ''};
  font-size: ${props => props.fontSize ? props.fontSize : ''};
  text-align: ${props => props.align ? props.align : 'center'};
  vertical-align: middle;
`;

export const TextContainer = styled.div`
  writing-mode: ${props => props.writingMode};
  padding: ${props => props.padding};
`;

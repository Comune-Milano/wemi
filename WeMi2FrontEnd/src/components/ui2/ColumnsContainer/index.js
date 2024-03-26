import styled from 'styled-components';
import media from 'utils/media-queries';

const ColumnContainer = styled.div`
display: ${props => props.display};
width: ${props => props.width};
column-count: ${props => props.xsCount}
  ${media.sm`
  column-count: ${props => props.smCount}
  `}
  ${media.md`
  column-count: ${props => props.mdCount}
  `}
  ${media.lg`
  column-count: ${props => props.lgCount}
  `}
`;

ColumnContainer.displayName = 'ColumnContainer';
export default ColumnContainer;
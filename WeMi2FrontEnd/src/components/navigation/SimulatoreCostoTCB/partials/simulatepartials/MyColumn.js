import media from 'utils/media-queries';
import {Column} from 'components/ui/Grid';
//import { colors } from 'theme';
import styled from 'styled-components';


const MyColumn = styled(Column)`
padding: 20px 0;
  ${media.sm`
  padding: 20px 0;  
  `}
  ${media.md`

  padding: 0 20px;
  `}
  
`;
MyColumn.displayName="MyColumn";
export default MyColumn;
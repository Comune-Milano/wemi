import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme'
import Text from 'components/ui/Text';
import moment from 'moment';
import media from 'utils/media-queries';


export const StyledHeader = styled.div`
  padding: 3em 3em;
  min-height: 7em;
  background-color: ${colors.greyInput};
  h2 {
    padding-right: 4em;
  }

  ${media.md`
    padding: 3em 6em;

    h2 {
      padding-right: 0;
    }
  `}

`;
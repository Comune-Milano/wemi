
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { Column } from 'components/ui/Grid';

export const ColumnLeftSection = styled(Column)`
  padding: 0;
  padding-bottom: 3em;
  border-bottom: 2px solid ${colors.grey};

  ${media.lg`
    padding-right: 3em;
    border-bottom: none;
    border-right: 2px solid ${colors.grey};
  `}
`;

export const ColumnRightSection = styled(Column)`
  padding: 0;
  padding-top: 3em;
  padding-bottom: 3em;

  ${media.lg`
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 3em;
  `}
`;
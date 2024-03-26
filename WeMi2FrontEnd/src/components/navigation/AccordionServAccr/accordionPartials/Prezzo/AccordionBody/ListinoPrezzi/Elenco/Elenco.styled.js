import styled from 'styled-components';
import { colors } from 'theme';

import { Row, Column } from 'components/ui/Grid';

export const BorderedRow = styled(Row)`
    padding: 1em 0;
    align-items: center;
    border-top: 1px solid ${colors.blue};
    &:last-child {
      border-bottom: 1px solid ${colors.blue};
    }
`;

export const SubBorderedRow = styled(BorderedRow)`
    border-top: none;
    padding: 0;
    border-bottom: 1px solid ${colors.blue};
    &:last-child {
      border-bottom: none;
    }
`;

export const BorderedColumn = styled(Column)`
    align-items: center;
    border-left: 1px solid ${colors.blue};
`;

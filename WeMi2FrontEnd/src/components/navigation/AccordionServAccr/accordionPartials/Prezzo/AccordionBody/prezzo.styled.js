import styled from 'styled-components';

import { colors } from 'theme';
import { Row, Column } from 'components/ui/Grid';

export const BorderedRow = styled(Row)`
    padding: 1em 0;
    align-items:center;
    justify-content:space-between;
    border-top: 1px solid ${colors.grey};
    &:last-child {
    border-bottom: 1px solid ${colors.grey};
    }
`;

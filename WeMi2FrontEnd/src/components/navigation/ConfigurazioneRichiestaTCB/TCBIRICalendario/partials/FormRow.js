import styled from 'styled-components';
import { colors } from 'theme';
import {Row} from 'components/ui/Grid';

const FormRow = styled(Row)`
border-top: 1px solid ${colors.grey};
&:last-child {
border-bottom: 1px solid ${colors.grey};
}
`;
export default FormRow;
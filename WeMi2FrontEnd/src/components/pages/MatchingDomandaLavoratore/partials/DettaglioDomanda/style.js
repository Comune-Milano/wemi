import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import { colors } from 'theme';

export const InformazioniDomandaRow = styled(Row)`
  border-bottom: 2px solid ${colors.primary};
  border-top: 2px solid ${colors.primary};
  width: 100%;
`;

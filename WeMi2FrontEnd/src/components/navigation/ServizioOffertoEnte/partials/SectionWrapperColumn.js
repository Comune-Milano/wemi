import { Column } from "components/ui/Grid";
import styled, { css } from "styled-components";

export const SectionWrapperColumn = styled(Column)`
  ${({ sectionsContentPrintWidth }) => sectionsContentPrintWidth && css`
    @media print {
      width: ${sectionsContentPrintWidth};
    }
  `}
`;
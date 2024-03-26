/** @format */
import styled from 'styled-components';
import { colors } from 'theme';
// import { Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import Checkbox from 'components/ui2/Checkbox';

const CheckboxWithBorderComponent = styled(Checkbox)`
 margin-right: 1em;
 label {
   padding-right: 0.5em;
 }
${media.sm`
  border-right: 1px solid ${colors.primary};
 width: auto;


  `}
  ${media.md`
  border-right: 1px solid ${colors.primary};
 width: auto;


`}
${media.lg`
border-right: 1px solid ${colors.primary};
width: auto;

`}
`;
CheckboxWithBorderComponent.displayName = 'CheckboxWithBorderComponent';

export const CheckboxWithBorder = CheckboxWithBorderComponent;

import Text from 'components/ui/Text';
import styled from 'styled-components';

export const StyledText = styled(Text)`
  -webkit-box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
`;

export const StyledWrapper = styled.div`
  display: inline-block;
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`};
  width: 100%;
`;

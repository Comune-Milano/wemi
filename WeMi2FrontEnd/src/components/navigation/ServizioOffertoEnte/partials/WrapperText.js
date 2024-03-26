import styled from 'styled-components';

const WrapperText = styled.div`
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  padding: ${props => props.padding};
`;

WrapperText.displayName = 'WrapperText';

export default WrapperText;

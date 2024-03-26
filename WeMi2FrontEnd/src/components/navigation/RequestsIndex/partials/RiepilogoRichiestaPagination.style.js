import styled from 'styled-components';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { Row } from 'components/ui/Grid';
import { colors } from 'theme';
import Button from 'components/ui2/Button';

export const TabellaOverflow = styled(Row)`
  overflow: auto;
  min-height: 10em;
  @keyframes PagefadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  animation-name: PagefadeIn;
  animation-duration: 1s;
`;


export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  i {
    margin-right: 1em;
  }
`;


export const Notification = styled.span`
  margin-right: 1em;
  height: 1em;
  width: 1em;
  padding: 0.5em;
  background-color: ${({ color }) => hexToRgba(colors[color], 0.9)};
  border-radius: 50%;
  display: inline-block;
`;

export const RichiestaRow = styled(Row)`
  border-top: 2px solid ${colors.primary};
  width: 100%;
  cursor: pointer;
`;
export const ButtonFocus = styled.button`
  &:hover, &:focus{
    background-color: ${hexToRgba(colors.primary, 0.2)} !important;
  }
  &:last-child {
    border-bottom: 2px solid ${colors.primary} !important;
  }
  align-items: center;
  background-color: transparent;
  border-radius: 0;
  outline: none !important;
  padding: 0;
  width: 100%;
  display: block;
  border: 0 white;
`;
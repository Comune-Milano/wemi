import media from 'utils/media-queries';
import Button from 'components/ui/Button';
import { colors } from 'theme';
import styled, {css} from 'styled-components';


const ButtonTabs = styled(Button)`
min-width: unset;
  white-space: normal;
  width: 100%;
  ${media.sm`
  //width: 110%;
  //font-size: 60%;
 // padding: 0 1em;
  `}
  ${media.md`
  //width: 110%;
  //font-size: 60%;
  //padding: 0 1em;
  `}
  ${media.lg`
  width: 100%;
  //font-size: 70%;
  `}
  color: #55565a !important;
  background-color: ${colors.grey} !important;
  justify-content: center !important;
  line-height: 1;
  min-height: 3rem;
  box-shadow: none;

  border: none;
  ${props => !props.disabled && css`
  :hover {
    border: none !important;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)
  }`
}
  :focus {
    outline:0;
    background-color: ${colors.primary} !important;
    color: white !important;}
  }
  ${props => props.active && css`
    border: none !important;
    color: white !important;
    background-color: ${colors.primary} !important;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)!important;
    `}
  transition: all .2s linear;

`;
ButtonTabs.displayName="ButtonTabs";
export default ButtonTabs;
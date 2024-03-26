import styled from 'styled-components';
import { Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import { colors } from 'theme';

export const DivContent = styled.div`
  border-bottom: solid ${colors.primary};
  border-left: solid ${colors.primary};
  border-right: solid ${colors.primary};
  background-color: ${colors.white};
  border-width: 1.5px 1.5px 1.5px 1.5px;
  padding: 17px 0;
`;

export const Container = styled.div`
  padding: 15px 0;
  cursor: pointer;
  border-color: ${props => props.isSelected ? colors.primary : 'rgb(181, 181, 181)'};
  border-style: solid;
  background-color: ${props => props.isSelected ? 'rgba(0, 153, 168, 0.15)' : 'white'};
  border-width: 1.5px 1.5px 1.5px 1.5px;
  &:hover {
    border-color: rgb(0, 153, 168);
    background-color: rgba(0, 153, 168, 0.15);
  }
`;

export const ImgContainer = styled(Column)`
  width: 16%;
  padding: 0;
  ${media.sm`
    width: 7%;
  `}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%
  margin: 0 0 0 1em;
`;

export const TextContainer = styled(Column)`
  width: 84%;
  align-self: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 1.28rem;
  padding: 0 0 0 2em;
  ${media.sm`
    width: 93%;
    `
   } 
`;

export const RadioContainer = styled(Column)`
  width: 11.9%;
  ${media.sm`
    width: 8.33%;
  `}
  ${media.lg`
    width: 11.9%;
  `}
  ${media.xl`
    width: 8.33%;
  `}
  padding: 0;
`;

export const IdVoucherContainer = styled(Column)`
  width: 29.77%;
  padding: 0;
  text-align: left;
  position: relative;
  ${media.sm`
    width: 16.67%
  `}
  ${media.lg`
  width: 29.77%
  `}
  ${media.xl`
  width: 16.67%
  `}
`;

export const CfContainer = styled(Column)`
  width: 58.33%;
  padding: 0;
  position: relative;
  text-align: left;
  ${media.sm`
    width: 22%
  `}
  ${media.lg`
  width: 58.33%
  `}
  ${media.xl`
  width: 22%
  `}
`;

export const RemainingImportContainer = styled(Column)`
  width: 29.77%;
  padding: 0;
  margin-left: 11.9%;
  position: relative;
  margin-top: 1.5em;
  text-align: left;
  ${media.sm`
    width: 12.34%
    margin-left: 0;
    text-align: right;
    margin-top: 0;
  `}
  ${media.lg`
  width: 29.77%
  margin-left: 11.9%;
  text-align: left;
  margin-top: 1.5em;
  `}
  ${media.xl`
  width: 12.34%
  margin-left: 0;
  text-align: right;
  margin-top: 0;
  `}
`;

export const DataContainer = styled(Column)`
  width: 24.2%;
  padding: 0;
  position: relative;
  text-align: left;
  margin-top: 1.5em;
  ${media.sm`
    width: 15.66%
    text-align: right;
    margin-top: 0;
  `}
  ${media.lg`
  width: 24.2%
  text-align: left;
  margin-top: 1.5em;
  `}
  ${media.xl`
  width: 15.66%
  text-align: right;
  margin-top: 0;
  `}
`;

export const InputContainer = styled(Column)`
  width: 34.13%;
  padding: 0 1em 0 3em;
  display: flex;
  margin-top: 1.5em;
  justify-content: center;
  ${media.sm`
    width: 25%
    margin-top: 0;
  `}
  ${media.lg`
    width: 34.13%
    margin-top: 1.5em;
  `}
  ${media.xl`
    width: 25%
    margin-top: 0;
  `}
`;

export const ValueContainer = styled.div`
  position: static;
  width: 100%;
  ${media.sm`
    position: absolute;
    right: 0;
    bottom: 50%;
  `}
  ${media.lg`
    position: static;
    right: 0;
    bottom: 0;
  `}
  ${media.xl`
    position: absolute;
    right: 0;
    bottom: 50%;
  `}
`;

export const TitleContainer = styled.div`
  position: static;
  width: 100%;
  ${media.sm`
    position: absolute;
    right: 0;
    bottom: 0;
  `}
  ${media.lg`
    position: static;
    right: 0;
    bottom: 0;
  `}
  ${media.xl`
    position: absolute;
    right: 0;
    bottom: 0;
  `}
`;

export const BottomTitleContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0 0 1.5em 0;
  width: 100%;
  ${media.sm`
    padding: 0;
  `}
`;

export const CenterValueContainer = styled.div`
  width: 100%;
  position: absolute;
  padding: 0 0 0.5em 0;
  right: 0;
  bottom: 50%;
  ${media.sm`
    padding: 0;
  `}
`;

export const Div = styled.div``;

export const OtherPaymentMethodDiv = styled.div`
  align-items: center;
  border-color: ${props => props.isSelected ? 'rgb(0, 153, 168)' : 'rgb(181, 181, 181)'};
  border-style: solid;
  background-color: ${props => props.isSelected ? 'rgba(0, 153, 168, 0.15)' : 'white'};
  ${props => props.allDisabled ? 'pointer-events: none' : null}
  border-width: 1px 1.5px 1.5px;
  cursor: pointer;
  display: ${props => props.isLoading ? 'none' : 'flex'};
  padding: 12px 10px;
  &:hover {
    border-color: rgb(0, 153, 168);
    background-color: rgba(0, 153, 168, 0.15);
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`;

export const OtherPaymentMethodTextContainer = styled.div`
  font-size: 1.28rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
  color: rgb(85, 86, 90) !important;
`;

export const ChooseAnotherPaymentMethodDiv = styled.div`
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
  width: 100%;
  padding: 10px 18px 18px 18px;
  font-weight: 500;
  line-height: 1.2;
  text-decoration: underline;
  cursor: pointer;
`;

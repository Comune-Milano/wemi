import styled from 'styled-components';

export const WrapperShimmerImg = styled.div`
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeHolderShimmer;
  -webkit-animation-timing-function: linear;
  background: #BDBDBD;
  background-image: linear-gradient(to right, #BDBDBD 0%, #999999 20%, #BDBDBD 40%, #BDBDBD 100%);
  background-repeat: no-repeat;
  background-size: 800px 140px;
  height: 140px;
  position: relative;
  `;

export const WrapperShimmerDescription = styled.div`
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeHolderShimmer;
  -webkit-animation-timing-function: linear;
  background: #BDBDBD;
  background-image: linear-gradient(to right, #BDBDBD 0%, #999999 20%, #BDBDBD 40%, #BDBDBD 100%);
  background-repeat: no-repeat;
  background-size: 800px 140px;
  height: ${props => props.height ? props.height : '20px'};
  position: relative;
  `;

export const WrapperLoading = styled.div`
  margin: ${props => props.margin};
  padding: ${props => props.padding};

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;

export const Wrapper = styled.div`
  width: ${props => props.width}
`;

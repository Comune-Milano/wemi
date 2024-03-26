import styled from 'styled-components';

export const WrapperCardLoading = styled.div`
  border-color: #bdbdbd;
  border-radius: 2px;
  padding: 20px;
  background: #f0f0f0;
  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;

export const WrapperShimmer = styled.div`
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeHolderShimmer;
  -webkit-animation-timing-function: linear;
  background: #bdbdbd;
  background-image: linear-gradient(to right, #bdbdbd 0%, #999999 20%, #bdbdbd 40%, #bdbdbd 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  height: 104px;
  position: relative;
`;

const IwBase = styled.div`
  background: #f0f0f0;
  height: 6px;
  left: 0;
  position: absolute;
  right: 0;
`;

export const Iwr = styled(IwBase)`
  height: 40px;
  left: 40px;
  right: auto;
  top: 0;
  width: 8px;
`;

export const Iws = styled(IwBase)`
  height: 8px;
  left: 48px;
  top: 0;
`;

export const Iwt = styled(IwBase)`
  left: 136px;
  top: 8px;
`;

export const Iwu = styled(IwBase)`
  height: 12px;
  left: 48px;
  top: 14px;
`;

export const Iwv = styled(IwBase)`
  left: 100px;
  top: 26px
  background: #bdbdbd;
`;

export const Iww = styled(IwBase)`
  height: 10px;
  left: 48px;
  top: 32px;
`;

export const Iwx = styled(IwBase)`
  height: 20px;
  top: 40px;
`;

export const Iwy = styled(IwBase)`
  left: 410px;
  top: 60px;
`;

export const Iwz = styled(IwBase)`
  height: 13px;
  top: 66px;
`;

export const Iwa = styled(IwBase)`
  left: 440px;
  top: 79px;
`;

export const Iwb = styled(IwBase)`
  height: 13px;
  top: 85px;
`;

export const Iwc = styled(IwBase)`
  left: 178px;
  top: 98px;
`;

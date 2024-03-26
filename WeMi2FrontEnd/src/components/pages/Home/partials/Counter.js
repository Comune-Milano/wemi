
import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import media from 'utils/media-queries';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import Wrapper from './Wrapper';
import { CounterNumber } from './Counter.partials/CounterNumber';
import { HOME_ANCHORS } from '../constants/anchors';

const WrapperNumber = styled(Column)`
  ${media.xl`
    width: 25% !important;
  `}
`;

const StyledNumber = styled.div`
  width: 100%;
  text-align: center;
  font-size: 5.5rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 2rem;

  ${props => props.even && css`
    border-left: 1px solid ${colors.black};
  `}

  ${media.xl`
    border-left: 1px solid ${colors.black};

    ${props => props.last && css`
      border-right: 1px solid ${colors.black};
    `}
  `};
`;

const Counter = ({ 
  loading, 
  data 
}) => {
  const counterRef = useRef();
  const [counterAnimation, setCounterAnimation] = useState(false);

  const handleCounterAnimation = () => {
    const scrollY = document.body.getBoundingClientRect().top;
    if (counterRef.current) {
      const refScroll = counterRef.current.getBoundingClientRect().top;
      if (refScroll <= 400) {
        setCounterAnimation(true);
      }
    }
  };

  // Handle scroll on element
  useEffect(() => {
    window.addEventListener('scroll', handleCounterAnimation);
    return () => { window.removeEventListener('scroll', handleCounterAnimation); };
  }, []);

  const contatori = [
    {
      label: 'Servizi offerti',
      value: (!loading && data) ? parseInt(data.serviziOfferti, 10) : 0,
    },
    {
      label: 'Enti',
      value: (!loading && data) ? parseInt(data.entiAccreditati, 10) : 0,
    },
    {
      label: 'Operatori',
      value: (!loading && data) ? parseInt(data.operatoriAccreditati, 10) : 0,
    },
    {
      label: 'Cittadini',
      value: (!loading && data) ? parseInt(data.cittadiniIscritti, 10) : 0,
    },
  ];

  return (
    <Wrapper paddingTop="6.64rem" paddingBottom="0" paddingBottomMd="0" id={HOME_ANCHORS.sistemaWeMi}>
      <div ref={counterRef}>
        <BackgroundTitle
          label="I numeri"
          bgColor="red"
          size={bgTitleSizes.small}
        />
      </div>
      <Row margin="0" justifycontent="strech" alignitems="strech">
        {
          contatori.map((el, i) => (
            <WrapperNumber md="6" xs="6" padding="3em 0 0 0" key={`count_${i.toString()}`}>
              <StyledNumber even={(i + 1) % 2 === 0} last={contatori.length === i + 1}>
                {!Number.isNaN(el.value) && !loading ?
                  (
                    <CounterNumber
                      animate={counterAnimation}
                      startValue={0}
                      endValue={el.value}
                    />
                  ) :
                  0
                }
              </StyledNumber>
              <Text
                color="black"
                tag="div"
                value={el.label}
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                size="f7"
                align="center"
              />
            </WrapperNumber>
          ))
        }
      </Row>
    </Wrapper>
  );
};

Counter.displayName = 'Counter';

export default React.memo(Counter);

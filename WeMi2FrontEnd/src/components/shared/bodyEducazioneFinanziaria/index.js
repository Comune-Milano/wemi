import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import Button from 'components/ui2/Button';
import { WrapperButtonL, WrapperButtonR, WrapperText } from './bodyEducazioneFinanziaria.style';

const color = 'purple';
const pathIncontroIndividuale = '';
const pathIncontroPubblico = '';

const BodyEducazioneFinanziaria = ({ title = '', subTitle = '', children }) => (
  <>
    <Row fluid margin="0 0 1.3rem 0">
      <BackgroundTitle
        bgColor={color}
        label={title}
        size={bgTitleSizes.small}
      />
    </Row>
    <WrapperText>
      <Text
        value={subTitle}
        size="f6"
        color={color}
        transform="uppercase"
        tag="div"
        weight="bold"
        margin="0 0 2rem 0"
        letterSpacing="0.05em"
      />
      <Row fluid margin="0 0 2.8rem 0">
        {children}
      </Row>
    </WrapperText>
    <Row fluid justifycontent="space-between">
      <WrapperButtonL
        xs="12"
        sm="5"
        md="9"
        lg="6"
        padding="0"
        sizemargin={{ xs: '0 0 1rem 0', sm: '0 1rem 0 0', md: '0 0 1rem 0', lg: '0' }}
        sizepadding={{ md: '0', lg: '0 1.6rem 0 0' }}
      >
        <AnchorLink
          to={pathIncontroPubblico}
          _blank
          width="auto"
        >
          <Button
            label="iscriviti ad un incontro pubblico"
            color={color}
            fontSize="f7_5"
            weight="bold"
            letterSpacing="0.05rem"
          />
        </AnchorLink>
      </WrapperButtonL>
      <WrapperButtonR
        xs="12"
        sm="5"
        md="9"
        lg="6"
        padding="0"
        sizepadding={{ md: '0', lg: '0 0 0 1.6rem' }}
      >
        <AnchorLink
          to={pathIncontroIndividuale}
          _blank
          width="auto"
        >
          <Button
            label="richiedi un incontro individuale"
            onClick={() => { }}
            color={color}
            fontSize="f7_5"
            weight="bold"
            letterSpacing="0.05rem"
          />
        </AnchorLink>
      </WrapperButtonR>
    </Row>
  </>
  );

BodyEducazioneFinanziaria.displayName = 'Educazione Finanziaria - Body';
export default BodyEducazioneFinanziaria;

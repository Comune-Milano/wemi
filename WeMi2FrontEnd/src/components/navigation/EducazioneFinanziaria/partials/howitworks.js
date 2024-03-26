import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import Text from 'components/ui/Text';
import incontricollettivi from 'images2/educazione-finanziaria/educazione-finanziaria_incontri-collettivi.png';
import incontriindividuali from 'images2/educazione-finanziaria/educazione-finanziaria_incontri-individuali.png';
import Button from 'components/ui2/Button';
import AnchorLink from 'components/ui/AnchorLink';
import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import useWindowSize from 'hooks/useWindowSize';
import { WrapperCard, Img, StyledColumn, ImgContainer, TextContainer } from '../components.styled';
import { pathIncontroIndividuale, pathIncontroPubblico } from '../constants';


const HowItWorks = () => {
  const windowSize = useWindowSize();
  const isMobileDevice = ['xs', 'md', 'lg'].indexOf(windowSize) > -1;

  return (
    <>
      <Row fluid sizepadding={{ xs: '3rem 0 2rem 0', md: '5rem 0 2rem 0' }}>
        <BackgroundTitle
          label="COME FUNZIONA"
          color="white"
          bgColor="purple"
          size="small"
        />
      </Row>
      <Row fluid margin="0 0 2rem 0">
        <TextSpan>
          Il servizio di educazione finanziaria si sviluppa attraverso
          <b> due momenti differenti:</b>
        </TextSpan>
      </Row>
      <Row fluid margin="0 0 3em 0">
        <Column xs="12" sm="12" md="6" sizepadding={{ xs: '0 0 1em 0', md: '0 1.2em 0 0' }}>
          <WrapperCard>
            <Column padding="0" md="12" lg="11" textAlign={isMobileDevice ? 'center' : ''}>
              <Text
                value="INCONTRI PUBBLICI DI SENSIBILIZZAZIONE"
                color="purple"
                size="f7"
                weight="bold"
                lineHeight="175%"
                letterSpacing="0.05em"
              />
            </Column>
            <Row fluid margin="0 0 1.5rem 0">
              <ImgContainer>
                <Img src={incontricollettivi} alt="" />
              </ImgContainer>
              <TextContainer padding="0" sizepadding={{ sm: '0 0 0 1.3em', md: '0', xl: ' 0 0 0 2.8em' }} alignself="center">
                <Text
                  value="Incontri di gruppo della durata di due ore, in cui vengono forniti spunti di riflessione su temi importanti della vita economica e vengono dati alcuni consigli per gestire meglio le proprie risorse economiche, presenti e future."
                  color="black"
                  size="f7"
                  lineHeight="175%"
                />
              </TextContainer>
            </Row>
            <StyledColumn padding="0">
              <AnchorLink
                to={pathIncontroPubblico}
                _blank
                width="auto"
              >
                <Button
                  label="ISCRIVITI AD UN INCONTRO PUBBLICO"
                  color="purple"
                />
              </AnchorLink>
            </StyledColumn>
          </WrapperCard>
        </Column>
        <Column xs="12" sm="12" md="6" padding="0">
          <WrapperCard>
            <Column padding="0" md="12" textAlign={isMobileDevice ? 'center' : ''}>
              <Text
                value="INCONTRI INDIVIDUALI DI ACCOMPAGNAMENTO"
                color="purple"
                size="f7"
                weight="bold"
                lineHeight="175%"
                letterSpacing="0.05em"
              />
            </Column>
            <Row fluid margin="0 0 1.5rem 0">
              <ImgContainer>
                <Img src={incontriindividuali} alt="" />
              </ImgContainer>
              <TextContainer padding="0" sizepadding={{ sm: '0 0 0 1.3em', md: '0', xl: '0 0 0 2.8em' }} alignself="center">
                <Text
                  value="Incontri anche continuativi per risolvere problemi concreti relativi alla vita economica della famiglia e pianificare nuovi traguardi. Al termine dell'incontro riceverai un report scritto che riepiloga quanto è stato fatto e quanto consigliato."
                  color="black"
                  size="f7"
                  lineHeight="175%"
                />
              </TextContainer>
            </Row>
            <StyledColumn padding="0">
              <AnchorLink
                to={pathIncontroIndividuale}
                _blank
                width="auto"
              >
                <Button
                  label="RICHIEDI UN INCONTRO INDIVIDUALE"
                  color="purple"
                />
              </AnchorLink>
            </StyledColumn>
          </WrapperCard>
        </Column>
      </Row>
      <Row fluid margin="0 0 7em 0">
        <TextSpan>
          Il servizio è predisposto per essere fruito sia
          <b> a distanza </b>
          che
          <b> in presenza </b>
          in spazi dedicati. Gli incontri collettivi sono propedeutici all&apos;incontro individuale con l&apos;educatore o educatrice finanziaria. Pur non essendo obbligatorio,
          <b> è consigliato partecipare agli incontri collettivi prima dell&apos;incontro individuale.</b>
        </TextSpan>
      </Row>
    </>
  );
};

HowItWorks.displayName = 'HowItWorks';


export default HowItWorks;

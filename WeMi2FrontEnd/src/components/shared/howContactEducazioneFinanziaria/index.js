import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import AnchorLink from 'components/ui/AnchorLink';
import ListaOraria from 'components/shared/ListaOraria';
import { useNavHeight } from 'hooks/useNavHeight';
import { RowSticky } from './howContactEducazioneFinanziaria.styled';
import { dataDefault, color } from './constant';


const HowContactEducazioneFinanziaria = ({ data = dataDefault }) => {
  const navHeight = useNavHeight();

  return (
    <Column padding="0" md="5" sizemargin={{ xs: '6rem 0 0 0', md: '0' }}>
      <RowSticky fluid sizepadding={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} navHeight={navHeight}>
        <BackgroundTitle
          bgColor={color}
          label="COME CONTATTARCI"
          size={bgTitleSizes.small}
        />
        <Row fluid margin="1.8em 0 1.8em">
          <Text
            value="Vuoi iscriverti ad uno dei prossimi incontri collettivi o riflettere sulla tua economia personale?"
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Row fluid padding="0 0 .5em">
          <Text
            transform="uppercase"
            letterSpacing="0.05em"
            value="CHIAMACI"
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Row fluid padding="0 0 0.5em">
          <AnchorLink
            weight="bold"
            color={color}
            value={data.number}
            to={`tel:${data.number}`}
            textDecoration="none"
          />
        </Row>
        <Row fluid padding="0 0 0.5em">
          <Text
            value="Nei seguenti orari:"
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Row fluid>
          <ListaOraria
            timetables={data.timetables}
          />
        </Row>
        <Row fluid margin="1.8em 0 .5em">
          <Text
            transform="uppercase"
            letterSpacing="0.05em"
            value="scrivici"
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Row fluid>
          <AnchorLink
            weight="bold"
            color={color}
            value="Invia la tua richiesta online"
            to={data.link}
            textDecoration="none"
            _blank
          />
        </Row>
      </RowSticky>
    </Column>
  );
};

HowContactEducazioneFinanziaria.displayName = 'Educazione Finanziaria - Come contattarci';
export default HowContactEducazioneFinanziaria;

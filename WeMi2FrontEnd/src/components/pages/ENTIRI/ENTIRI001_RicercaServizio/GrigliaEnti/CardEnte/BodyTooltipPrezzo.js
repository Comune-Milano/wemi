import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import styled from 'styled-components';

const TextFirstLetterUppercase = styled.span`
  p::first-letter {
    text-transform: uppercase;
  }
`;

const BodyTooltipPrezzo = ({
  ente,
  quantita,
  locale
}) => {

  const prezzoBase = ente.imPrezzoMinimo;

  return (
    <Row fluid justifycontent="left">
      <Column padding="0" >
        <Text
          value="DETTAGLIO COSTO"
          weight="bold"
          align="left"
          tag="div"
        />
      </Column>
      <Text
        value="Totale ="
      />
        &nbsp;
      <Text
        value={moneyFormat(ente.prezzoMinimoDaMostrare, true)}
      />
         &nbsp;
      <Text
        value={`( ${quantita.quantitaUnita} x ${prezzoBase} )`}
      />
      <br />
      <Text
        value="Totale per persona ="
      />
        &nbsp;
      <Text
        value={moneyFormat((ente.prezzoMinimoDaMostrare / quantita.quantitaPersone), true)}
      />
      <br />
      <TextFirstLetterUppercase>
        <Text
          value={`${ente.tlTestoAggettivo[locale]} / per persona =`}
          tag="p"
        />
      </TextFirstLetterUppercase>
        &nbsp;
      <Text
        value={moneyFormat((ente.prezzoMinimoDaMostrare / quantita.quantitaPersone / quantita.quantitaUnita), true)}
      />
    </Row>
  )

};

BodyTooltipPrezzo.displayName = 'BodyTooltipPrezzo';

export default BodyTooltipPrezzo;

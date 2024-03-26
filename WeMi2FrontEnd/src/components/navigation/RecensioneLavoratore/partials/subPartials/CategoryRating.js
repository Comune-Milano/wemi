/** @format */

import React from 'react';
import Hr from 'components/ui/Hr';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import Header from 'components/ui2/Header';
import Text from 'components/ui/Text';
import Rating from 'components/ui2/Rating';
import { useFormContext } from 'libs/Form/hooks/useFormContext';


const MyColumn = styled(Column)`
margin-top: 0.5em;
justify-content: flex-start;

${media.sm`
  margin-top: 0;
  justify-content: flex-end;
`}
`;

const CategoryRating = ({
  qtMediaSingolaRecensione,
  isReadOnly,
}) => {
  const { dataset, setFormField } = useFormContext();

  const categoryRating = [
    {
      field: 'valutazioneGenerale',
      title: 'Valutazione generale del lavoratore',
      stars: dataset.valutazioneGenerale,
    },
    {
      field: 'capacitaComunicative',
      title: 'Capacità comunicative',
      stars: dataset.capacitaComunicative,
    },
    {
      field: 'capacitaAdattamento',
      title: 'Capacità di adattamento',
      stars: dataset.capacitaAdattamento,
    },
    {
      field: 'capacitaGestTempo',
      title: 'Capacità di gestione del tempo',
      stars: dataset.capacitaGestTempo,
    },
  ];


  return (
    <>
      <Header fontSize="f4" title="Valutazioni servizio" color="primary" width="100%" />
      <Row fluid margin="0 0 2em 0">
        {categoryRating.map((rating, i) => (
          <Row fluid margin="0" alignitems="center" key={i.toString()} padding="1em 0 0 0">
            <Column xs="12" sm="8" md="9" lg="9" padding="0 1.5rem 0 0" alignself="center">
              <Text
                intlFormatter
                value={rating.title}
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                color="primary"
                size="f6"
                padding="0 0.2rem 0 0"
                aria-label={rating.title}
                tabindex="0"
              />
            </Column>
            <MyColumn xs="12" sm="4" md="3" lg="3" flex justifycontent="flex-end" padding="0" alignself="center">
              <Rating fontSize="f6" color="primary" onClick={(valore) => { setFormField(rating.field, valore); }} stars={rating.stars} border readOnly={isReadOnly} spacingRight="0.2em" />
            </MyColumn>
            <Hr width="100%" height="1.5px" color="grey" top="0px" bottom="0px" />
          </Row>
        ))}
        <Row fluid margin="0" alignitems="center" padding="1em 0 0 0" margin="1em 0 0 0">
          <Column xs="12" sm="8" md="9" lg="9" padding="0 1.5rem 0 0" alignself="center">
            <Text
              intlFormatter
              value="Competenze relazionali"
              transform="uppercase"
              letterSpacing="0.05em"
              weight="bold"
              color="primary"
              size="f6"
              padding="0 0.2rem 0 0"
            />
          </Column>
          <MyColumn xs="12" sm="4" md="3" lg="3" flex justifycontent="flex-end" padding="0" alignself="center">
            <Rating fontSize="f6" color="primary" stars={qtMediaSingolaRecensione} border readOnly spacingRight="0.2em" />
          </MyColumn>
          <Hr width="100%" height="1.5px" color="grey" top="0px" bottom="0px" />
        </Row>
      </Row>
    </>
  );
};

CategoryRating.displayName = 'CategoryRating';
export default (CategoryRating);

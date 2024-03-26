
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Select from 'components/ui2/Select';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import styled from 'styled-components';
import media from 'utils/media-queries';

const StyledRow = styled(Row)`
  display: block;
  ${media.md`
    display: flex;
  `}
`;

const CaratteristicheFisiche = ({
  dataset,
  setFormField,
  altezza,
  corporatura,
  locale,
}) => {
  const creaItems = arr => arr.map(ele => ({ id: ele.cdDominioTcb, value: ele.tlValoreTestuale[locale] }));

  const altezzaItems = creaItems(altezza);
  const corporaturaItems = creaItems(corporatura);

  return (
    <>
      <Row fluid>
        <GroupFieldTitle
          marginTop="2em"
          title="Caratteristiche fisiche"
        />
      </Row>
      <StyledRow fluid>
        <Column padding="0" sizepadding={{ md: '0 1em 0 0' }} lg="5" md="5" sm="5" xs="6">
          <Select
            name="Altezza"
            label="Altezza"
            items={altezzaItems}
            selectedValue={dataset.altezza}
            clickedSelectedItem={() => setFormField('altezza', undefined)}
            clickedItem={(value) => setFormField('altezza', value)}
            placeholder="Seleziona altezza"
          />
        </Column>
        <Column padding="0" sizepadding={{ xs: '1rem 0 0 0', md: '0 0 0 1em' }} lg="5" md="5" sm="5" xs="6">
          <Select
            name="Corporatura"
            label="Corporatura"
            items={corporaturaItems}
            selectedValue={dataset.corporatura}
            clickedSelectedItem={() => setFormField('corporatura', undefined)}
            clickedItem={(value) => setFormField('corporatura', value)}
            placeholder="Seleziona corporatura"
          />
        </Column>
      </StyledRow>
    </>
  );
};

CaratteristicheFisiche.displayName = 'CaratteristicheFisiche';

export default (CaratteristicheFisiche);

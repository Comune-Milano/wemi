/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import CategoryRating from './subPartials/CategoryRating';
import ValutazioniCarattere from './subPartials/ValutazioniCarattere';
import Wrapper from './Wrapper';

const ValutazioniServizio = ({
    locale,
    datiCarattere,
    qtMediaSingolaRecensione,
    isReadOnly,
}) => {
  const { dataset, setFormField } = useFormContext();

  return (
    <Wrapper fluid>
      <CategoryRating
        qtMediaSingolaRecensione={qtMediaSingolaRecensione}
        isReadOnly={isReadOnly}
      />
      <ValutazioniCarattere
        locale={locale}
        datiCarattere={datiCarattere}
        isReadOnly={isReadOnly}
      />
      <Row fluid padding="2.5rem 0 0 0" margin="0 0 2.5em 0">
        <TextArea
          material
          height="8.5rem"
          disabled={isReadOnly}
          label="COMMENTO"
          onChange={(valore) => { setFormField('txNotaRecensione', valore); }}
          inputValue={dataset.txNotaRecensione}
        />
      </Row>
    </Wrapper>
  );
};
const mapDispatchToProps = ({
});
const mapStoreToProps = store => ({
  locale: store.locale,
});

ValutazioniServizio.displayName = 'ValutazioniServizio';
export default connect(mapStoreToProps, mapDispatchToProps)(ValutazioniServizio);

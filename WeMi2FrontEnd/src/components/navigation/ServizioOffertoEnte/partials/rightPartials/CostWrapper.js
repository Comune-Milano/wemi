/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { Row } from 'components/ui/Grid';
import { Cost } from '.';
import { SectionTitle } from '../SectionTitle';
import { SectionWrapperColumn } from '../SectionWrapperColumn';

const CostWrapper = ({
  servizioErogato,
  locale,
  sectionsContentPrintWidth,
}) => {
  const jsonDatiPrezzo = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo', false);
  const servizio = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.service', false);
  const unitaPrezzo = servizio.prezzo;
  const { cdTipoOffertaServizio } = jsonDatiPrezzo;

  return (
    <Row fluid sizemargin={{ xs: '3.91rem 0 0 0', md: '0' }}>
      <SectionTitle value={`Prezzo ${cdTipoOffertaServizio == 3 ? unitaPrezzo.tl_testo_aggettivo[locale] : ''}`} />
      <SectionWrapperColumn
        padding="0"
        margin="0"
        xs="12"
        sectionsContentPrintWidth={sectionsContentPrintWidth}
      >
        <Cost servizioErogato={servizioErogato} locale={locale} />
      </SectionWrapperColumn>
    </Row>

  );
};


CostWrapper.displayName = 'CostWrapper';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(mapStoreToProps, null)(CostWrapper);

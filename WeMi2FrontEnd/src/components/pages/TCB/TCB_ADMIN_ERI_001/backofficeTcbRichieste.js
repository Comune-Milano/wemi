/** @format */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BackofficeTcbListaRichieste from './backofficeTcbListaRichieste';

const BackofficeTcbRichieste = ({ locale }) => {
  const richiesteTcbButtonsTypes = {
    AssociaLavoratore: 'AssociaLavoratore',
    NotaChiusuraPositivaDomanda: 'NotaChiusuraPositivaDomanda',
    ChiudiNegativo: 'ChiudiNegativo',
    Disassocia: 'Disassocia',
    RichiestaValutazioneWeMi: 'RichiestaValutazioneWeMi',
    ModificaDomanda: 'ModificaDomanda',
    GestioneAssociazioniLavoratori: 'GestioneAssociazioniLavoratori',
    RichiestaValutazioneLavoratori: 'RichiestaValutazioneLavoratori',
    VisualizzaValutazioneLavoratore: 'VisualizzaValutazioneLavoratore',
  };

  return (
    <BackofficeTcbListaRichieste
      locale={locale}
      richiesteTcbButtonsTypes={richiesteTcbButtonsTypes}
    />
  );
};

BackofficeTcbRichieste.displayName = 'BackofficeTcbRichieste';

const mapStoreToProps = store => ({
  locale: store.locale,
});
export default withRouter(connect(mapStoreToProps)(BackofficeTcbRichieste));

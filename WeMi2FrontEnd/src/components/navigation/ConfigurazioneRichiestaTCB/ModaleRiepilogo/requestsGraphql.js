/** @format */

import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';

// TCBIRI002
import {
  estraiDatiConfigurazioneRichiesta002 as estraiDatiConfigurazioneRichiesta002Q,
} from '../Beneficiari/partials/graphQLTCBIRI002';
// TCBIRI003
import {
  estraiMansioniTata as estraiMansioniTataQ,
  estraiMansioniBadante as estraiMansioniBadanteQ,
  estraiFasceEtaRichiesta as estraiFasceEtaRichiestaQ,
  estraiDatiConfigurazioneRichiesta003 as estraiDatiConfigurazioneRichiesta003Q,
  estraiAttributoBeneficiarioTCB as estraiAttributoBeneficiarioTCBQ,
} from '../CuraDellePersone/estraiMansioniTcbGraphQL';
// TCBIRI004
import {
  estraiDatiConfigurazioneRichiesta004 as estraiDatiConfigurazioneRichiesta004Q,
  estraiBase as estraiBaseQ,
} from '../CuraDellaCasa/estraiDominiTcb';
// TCBIRI005
import { estraiDatiConfigurazioneRichiesta005 as estraiDatiConfigurazioneRichiesta005Q } from '../CuraDegliAnimali/estraiDominiTcb';
// TCBIRI006
import {
  estraiLivelliContrattuali as estraiLivelliContrattualiQ,
  estraiInformazioniDisponibilita as estraiInformazioniDisponibilitaQ,
  estraiDatiDisponibilita as estraiDatiDisponibilitaQ,
} from '../DisponibilitaRichiesta/EstraiDomini';
import { arrayAttributi } from '../DisponibilitaRichiesta/utils/arrayAttributi';
import { findFasceStipendio } from '../DisponibilitaRichiesta/utils/findFasceStipendio';
// TCBIRI007
import { estraiDatiReferenzeLavoratore as estraiDatiReferenzeLavoratoreQ } from '../PreferenzeSulLavoratore/InserisciDatiRichiesta007';
import { ATTRIBUTI_REF_LAV } from '../PreferenzeSulLavoratore/utils/attributiReferenzeLavoratore';
// TCBIRI008
import {
  estraiDatiRichiesta008 as estraiDatiRichiesta008Q,
} from '../SedeLavoroEContatti/partials/graphQLTCBIRI008';
import ATTRIBUTI_CONTATTI from '../SedeLavoroEContatti/partials/Attributi';


export const TCBGraphQLRequests = (idRichiestaTcb, servizioTCB, locale) => {
  const gql002 = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta002Q,
    {
      idRichiestaTcb,
      idServizio: servizioTCB.cd_dominio_tcb,
    },
    false
  );

  const gql003 = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta003Q,
    {
      input: {
        idRichiestaTcb,
        cdServizioTcb: servizioTCB.cd_dominio_tcb,
        locale,
      },
    },
    false
  );

  const gql003_attr = useGraphQLRequest(
    undefined,
    estraiAttributoBeneficiarioTCBQ,
    {
      idRichiestaTcb,
      cdAttributo: 95,
    },
    false
  );

  const gql004 = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta004Q,
    { idRichiestaTcb },
    false
  );

  const gql005 = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta005Q,
    { idRichiestaTcb },
    false
  );

  const gql006 = useGraphQLRequest(
    [],
    estraiDatiDisponibilitaQ,
    {
      datiDisponibilita: {
        idRichiestaTcb,
        arrayConfig: arrayAttributi,
      },
    },
    false
  );

  const gql007 = useGraphQLRequest(
    undefined,
    estraiDatiReferenzeLavoratoreQ,
    { idRichiestaTcb, arrayConfig: Object.values(ATTRIBUTI_REF_LAV) },
    false
  );

  const gql008 = useGraphQLRequest(
    undefined,
    estraiDatiRichiesta008Q,
   { datiRichiesta: { idRichiestaTcb, arrayConfig: Object.values(ATTRIBUTI_CONTATTI) } },
    false
  );

  return {
    gql002,
    gql003,
    gql003_attr,
    gql004,
    gql005,
    gql006,
    gql007,
    gql008,
  };
};

/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest, TCBConfig001, TCBConfig002, TCBConfig004, PreventivoLightTCB } from 'redux-modules/actions/authActions';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import { Column } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import { FormTCBIRI001 } from './partials';
import FadeInWrapper from '../partials/FadeInWrapper';

import {
    inserisciModificaRichiestaServizioTcb as inserisciModificaRichiestaServizioTcbM, estraiDatiConfigurazioneRichiesta001 as estraiDatiConfigurazioneRichiesta001Q,
    eliminaDatiRichiestaByAttributo as eliminaDatiRichiestaByAttributoM,
    eliminaBeneficiarioTCB as eliminaBeneficiarioTCBM,
} from './InerisciRichiestaTcbGraphql';
import { estraiDatiConfigurazioneRichiesta004 as estraiDatiConfigurazioneRichiesta004Q } from '../CuraDellaCasa/estraiDominiTcb';
import { estraiDatiConfigurazioneRichiesta002 as estraiDatiConfigurazioneRichiesta002Q } from '../Beneficiari/partials/graphQLTCBIRI002';

const TCBIRI001 = ({ userProfile, step, setStep,
    modifica,
    datiRichiesta002, UPDdatiRichiesta002,
    datiRichiesta004, eliminato,
    setAvvisoModifica,
    prevLightTCB, PreventivoLightTCB,
    servizioTCB, orariTCB,
    config001, TCBConfig001, TCBConfig002,
    servizio,
    datiRichiesta001, idRequest,
    graphqlRequest, locale, loaded }) => {
  const [beneficiario, setBenFlag] = useState({ id: 0, value: 'no' });
  const [numeroPersone, setNumeroPersone] = useState(1);
  const [orario, setOrario] = useState(prevLightTCB.orario ? prevLightTCB.orario : {});
  const [casaFlag, setCasaFlag] = useState({ id: 0, value: 'no' });
  const firstConfig0001Update = useRef(true);

  const findIdService = (servName) => {
    switch (servName) {
      case 'Tata':
        return 1;
      case 'Colf':
        return 2;
      case 'Badante':
        return 3;
      default:
        return 0;
    }
  };

  const idServizio = findIdService(servizio);

  useEffect(() => {
    if (servizio && idRequest) {
      graphqlRequest(estraiDatiConfigurazioneRichiesta001Q(idRequest));
      graphqlRequest(estraiDatiConfigurazioneRichiesta002Q({ idRichiestaTcb: idRequest, idServizio }));
    }
  }, [graphqlRequest, UPDdatiRichiesta002]);


  const getBenFlag = value => {
    if (beneficiario.id === 0) setBenFlag(value);
    else setBenFlag({ id: 0, value: 'no' });
    TCBConfig001({
      config001: {
        benFlag: beneficiario.id === 0 ? '1' : '0',
        numeroPersone,
        casaFlag: casaFlag.id === 1 ? '1' : '0',
        orario,
      },
    });
  };

  const getCasaFlag = async (value) => {
    const continuaFunc = (continua) => {
      if (continua) {
        graphqlRequest(eliminaDatiRichiestaByAttributoM({ idRequest, arrayAttributi: [10, 12, 13, 28, 44, 49, 50, 52, 61, 92] }));
        graphqlRequest(estraiDatiConfigurazioneRichiesta004Q(idRequest));
        TCBConfig004({});
      }
      if (casaFlag.id === 0) setCasaFlag(value);
      else setCasaFlag({ id: 0, value: 'no' });
      TCBConfig001({
        config001: {
          benFlag: beneficiario.id === 1 ? '1' : '0',
          numeroPersone,
          casaFlag: casaFlag.id === 0 ? '1' : '0',
          orario,
        },
      });
    };
    if (idRequest && modifica && datiRichiesta004 && datiRichiesta004.superficieCasa !== null) {
      setAvvisoModifica.bind(this);
      setAvvisoModifica({ continuaFunc: continuaFunc.bind(this), info: 'Caratteristiche della casa', alert: 'cambio' });
    } else {
      continuaFunc();
    }
  };

  const getNumeroPersone = value => {
    setNumeroPersone(value);
    TCBConfig001({
      config001: {
        benFlag: beneficiario.id === 1 ? '1' : '0',
        numeroPersone: value,
        casaFlag: casaFlag.id === 1 ? '1' : '0',
        orario,
      },
    });
  };


  const getOrario = value => {
    setOrario(value);
    TCBConfig001({
      config001: {
        benFlag: beneficiario.id === 1 ? '1' : '0',
        numeroPersone,
        casaFlag: casaFlag.id === 1 ? '1' : '0',
        orario: value,
      },
    });
  };


    // const datiLogin = sessionStorage.getItem('DatiLogin') && sessionStorage.getItem('DatiLogin') !== 'null' ?
    //     JSON.parse(sessionStorage.getItem('DatiLogin')) : null;
  const { datiLogin } = userProfile;
  const valConfig = [
    {
      cd_attributo: 35,
      cd_val_attributo: 1,
      fg_val: (datiRichiesta001 && datiRichiesta001.benFlag !== config001.benFlag && config001.benFlag) || config001.benFlag ? config001.benFlag : undefined,
    },
    {

      cd_attributo: 54,
      cd_val_attributo: 1,
      fg_val: (datiRichiesta001 && datiRichiesta001.casaFlag !== config001.casaFlag && config001.casaFlag) || config001.casaFlag ? config001.casaFlag : undefined,
    },
    {
      cd_attributo: 14,
      cd_val_attributo: (datiRichiesta001 && config001.orario.id && datiRichiesta001.orario.cdValAttributo !== config001.orario.id) || config001.orario.id ? config001.orario.id : undefined,
    },
  ];

  return (
    <FadeInWrapper fluid>
      {idServizio === 3 ? (
        <>
          <Column xs="12" flex direction="column" padding="1em 0">
            <Text value="Configurazione della richiesta" size="f7" color="blue" weight="bold" tag="p" />
            <Text
              value="Aiutaci a configurare la tua richiesta con i requisiti principali per la/il badante."
              size="f7"
              tag="p"
              color="darkGrey"
            />
          </Column>
          <Column xs="1" xsShift="2" padding="1em 0">
          </Column>
        </>
              )
                : idServizio === 1 ? (
                  <>
                    <Column xs="12" flex direction="column" padding="1em 0">
                      <Text value="Configurazione della richiesta" size="f7" color="blue" weight="bold" tag="p" />
                      <Text
                        value="Aiutaci a configurare la tua richiesta con i requisiti principali per la baby-sitter"
                        size="f7"
                        tag="p"
                        color="darkGrey"
                      />
                    </Column>
                  </>
)
                    : idServizio === 2 ? (
                      <Column xs="12" flex direction="column" padding="1em 0">
                        <Text value="Configurazione della richiesta" size="f7" color="blue" weight="bold" tag="p" />
                        <Text
                          value="Aiutaci a configurare la tua richiesta con i requisiti principali per la colf"
                          size="f7"
                          tag="p"
                          color="darkGrey"
                        />
                      </Column>
                      )
                        : null
            }
      <FormTCBIRI001
        datiRichiesta001={datiRichiesta001}
        datiRichiesta002={datiRichiesta002}
        config001={config001}
        servizio={servizio}
        idServizio={idServizio}
        modifica={modifica}
        locale={locale}
        loaded={loaded === 2}
        orariTCB={orariTCB}
        beneficiario={beneficiario}
        getBenFlag={getBenFlag}
        numeroPersone={numeroPersone}
        getNumeroPersone={getNumeroPersone}
        orario={orario}
        getOrario={getOrario}
        casaFlag={casaFlag}
        getCasaFlag={getCasaFlag}
      />
      <Column xs="4" xsShift="4" autowidth padding="1em .2em">
        <Button
          value="Continua"
          disabled={!!(((numeroPersone > 999 || numeroPersone <= 0) && servizio && idServizio !== 2) || (!orario.id || orario.id === -1))}
          type={((numeroPersone > 999 || numeroPersone <= 0) && servizio && idServizio !== 2) || (!orario.id || orario.id === -1) ? 'disabled' : 'default'}
        />
      </Column>
    </FadeInWrapper>
  );
};

TCBIRI001.displayName = 'TCBIRI001';

const mapStoreToProps = store => ({
  loaded: store.graphql.loaded,
  locale: store.locale,
  orariTCB: store.graphql.tipoOrarioLavoroAll,
  prevLightTCB: store.requestTCB.preventivoLightTCB,
  datiRichiesta001: store.graphql.EstraiDatiConfigurazioneRichiesta001,
  datiRichiesta002: store.graphql.EstraiDatiConfigurazioneRichiesta002,
  UPDdatiRichiesta001: store.graphql.InserisciModificaRichiestaServizioTcb,
  UPDdatiRichiesta002: store.graphql.InserisciModificaAttributoBeneficiarioTCB,
  datiRichiesta004: store.graphql.EstraiDatiConfigurazioneRichiesta004,
  eliminato: store.graphql.EliminaBeneficiarioTCB,
});
const mapDispatchToProps = {
  graphqlRequest,
  TCBConfig001,
  TCBConfig002,
  TCBConfig004,
  PreventivoLightTCB,
};

export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(TCBIRI001));

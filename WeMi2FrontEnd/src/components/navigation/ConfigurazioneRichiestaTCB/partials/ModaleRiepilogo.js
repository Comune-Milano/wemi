/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import List from 'components/ui/List/List';
import FaIcon from 'components/ui/FaIcon';
import Scrollbar from 'components/ui/Scrollbar';
import media from "utils/media-queries";
import Wrapper from 'components/navigation/NavigationWrapper';
import { colors } from 'theme';
import { graphqlRequest, TCBStepper } from 'redux-modules/actions/authActions';
import { isNullOrUndefined } from 'util';
import { estraiDatiConfigurazioneRichiesta001 } from '../TCBIRI001/InerisciRichiestaTcbGraphql';
import { estraiDatiConfigurazioneRichiesta003 } from '../CuraDellePersone/estraiMansioniTcbGraphQL';
import { estraiDatiConfigurazioneRichiesta005 } from '../CuraDegliAnimali/estraiDominiTcb';
import { estraiDatiRichiesta007 } from '../PreferenzeLavoratore/InserisciDatiRichiesta007';
import { ATTRIBUTI_REF_LAV } from '../PreferenzeLavoratore/utils/attributiReferenzeLavoratore';
import { mapResponseToState } from '../PreferenzeLavoratore/utils/graphqlMapper';
import withAuthentication from 'hoc/withAuthentication';

const SummaryRow = styled(Row)`
  border-bottom: 1px solid ${colors.grey};
  justify-content: space-between;
  cursor: default;
`;


const TabLink = styled(Text)`
  cursor: pointer;
  color: ${colors.blue}!important
  &:hover {
    text-decoration: underline;
    color: ${colors.darkBlue}!important
  }
`;

const StyledNavWrapper = styled(Wrapper)`
  max-height: 90vh;
  overflow: auto;
  padding-bottom: 4em!important;

  ${media.md`
    max-height: none;
  `}
`;

const scrollbarStyle = {
  height: '50vh',
  overflowY: 'hidden',
  overflowX: 'hidden',
  justifyContent: 'space-between',
  width: '100%',
  paddingBottom: '2em',
};


const TCBRequestSummary = ({
  servizio,
  modalitaAssunzione,
  graphqlRequest,
  datiRichiesta001,
  datiRichiesta002,
  datiRichiesta003,
  datiRichiesta004,
  datiRichiesta005,
  datiRichiesta007,
  loaded,
  idRequest,
  TCBStepper,
  setOpen,
  locale,
  userProfile
}) => {
  // const storedUser = sessionStorage.getItem('DatiLogin');
  // const parsedUser = storedUser ? JSON.parse(sessionStorage.getItem('DatiLogin')) : null;
  const { datiLogin } = userProfile;
  const parsedUser = datiLogin;
  const userName = !isNullOrUndefined(parsedUser) && parsedUser.Nome;

  useEffect(
    () => {
      const cdServizioTcb = {
        Tata: 1,
        Colf: 2,
        Badante: 3,
      };

      graphqlRequest(estraiDatiConfigurazioneRichiesta001(idRequest));
      graphqlRequest(estraiDatiConfigurazioneRichiesta003({
        idRequest,
        cdServizioTcb: cdServizioTcb[servizio],
        locale,
      }));
      graphqlRequest(estraiDatiConfigurazioneRichiesta005(idRequest));
      graphqlRequest(estraiDatiRichiesta007({
        idRichiestaTcb: idRequest,
        arrayConfig: Object.values(ATTRIBUTI_REF_LAV),
      }));
    },
    []
  );

  // REFERENZE LAVORATORE
  const mappedDatiRichiesta007 = datiRichiesta007 && mapResponseToState(datiRichiesta007);
  const ripielogoDatiRichiesta007 = {
    flag: !!mappedDatiRichiesta007,
    title: 'Referenze lavoratore',
    step: 8,
    data: [],
  };

  console.warn(datiRichiesta003 && {
    flag: datiRichiesta003 && datiRichiesta003.mansioni.length > 0,
    field: 'Mansioni richieste',
    value: datiRichiesta003 && datiRichiesta003,
  });

  if (mappedDatiRichiesta007) {
    ripielogoDatiRichiesta007.data = [
      {
        flag: Number.isFinite(mappedDatiRichiesta007.anniEsperienza),
        field: 'N° anni esperienza',
        value: mappedDatiRichiesta007.anniEsperienza,
      },
      {
        flag: !!mappedDatiRichiesta007.esperienzeLavoratore &&
          mappedDatiRichiesta007.esperienzeLavoratore.length > 0,
        field: 'Esperienze pregresse',
        values: mappedDatiRichiesta007.esperienzeLavoratore
          .map(esperienza => esperienza.value),
      },
      {
        flag: !!mappedDatiRichiesta007.sessoLavoratore &&
          mappedDatiRichiesta007.sessoLavoratore.value,
        field: 'Preferenza sesso',
        value: mappedDatiRichiesta007.sessoLavoratore &&
          mappedDatiRichiesta007.sessoLavoratore.value,
      },
      {
        flag: !!mappedDatiRichiesta007.etaLavoratore &&
          mappedDatiRichiesta007.etaLavoratore.length > 0,
        field: 'Preferenze età',
        values: mappedDatiRichiesta007.etaLavoratore
          .map(eta => eta.value),
      },
      {
        flag: !!mappedDatiRichiesta007.carattereLavoratore &&
          mappedDatiRichiesta007.carattereLavoratore.length > 0,
        field: 'Preferenze carattere',
        values: mappedDatiRichiesta007.carattereLavoratore
          .map(carattere => carattere.value),
      },
      {
        flag: !!mappedDatiRichiesta007.titoloStudioLavoratore &&
          mappedDatiRichiesta007.titoloStudioLavoratore.value,
        field: 'Titolo studio',
        value: mappedDatiRichiesta007.titoloStudioLavoratore &&
          mappedDatiRichiesta007.titoloStudioLavoratore.value,
      },
      {
        flag: !!mappedDatiRichiesta007.lingueParlate &&
          mappedDatiRichiesta007.lingueParlate.length > 0,
        field: 'Lingue parlate',
        values: mappedDatiRichiesta007.lingueParlate
          .map(lingua => lingua.value),
      },
      {
        flag: !!mappedDatiRichiesta007.istruzioneTata &&
          mappedDatiRichiesta007.istruzioneTata.length > 0,
        field: 'Istruzione baby-sitter',
        values: mappedDatiRichiesta007.istruzioneTata
          .map(istruzione => istruzione.value),
      },
      {
        flag: true,
        field: 'Lavoratore con patente',
        value: mappedDatiRichiesta007.possessoPatente ?
          <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em" color="green" noShadow cursor="default" /> :
          <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default" />,
      },
      {
        flag: true,
        field: 'Lavoratore automunito',
        value: mappedDatiRichiesta007.possessoAuto ?
          <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em" color="green" noShadow cursor="default" /> :
          <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default" />,
      },
      {
        flag: true,
        field: `${servizio} iscritta`,
        value: mappedDatiRichiesta007.iscrizioneRegione ?
          <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em" color="green" noShadow cursor="default" /> :
          <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default" />,
      },
      {
        flag: mappedDatiRichiesta007.altrePreferenze,
        field: 'Altre preferenze',
        value: mappedDatiRichiesta007.altrePreferenze,
      },
      {
        flag: true,
        field: `Esperienze con ${servizio}`,
        value: mappedDatiRichiesta007.esperienzaCon ?
          <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em" color="green" noShadow cursor="default" /> :
          <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default" />,
      },
      {
        flag: mappedDatiRichiesta007.esperienzaCon,
        field: `Valutazione esperienze con ${servizio}`,
        value: mappedDatiRichiesta007.valutazioneEsperienze,
      },
    ];
  }

  const riepilogoMock = loaded === 2 ? [

    {
      flag: !!datiRichiesta001,
      title: 'Dati preliminari',
      step: 1,
      data: [
        {
          flag: true,
          field: 'Servizio',
          value: `${servizio}`,
        },
        {
          flag: datiRichiesta001 && datiRichiesta001.benFlag.flag === '1',
          field: 'Beneficiario',
          value: userName,
        },
        {
          flag: datiRichiesta001 && (servizio === 'Tata' || servizio === 'Badante'),
          field: servizio === 'Tata' ? 'N° di bambini' : servizio === 'Badante' ? 'N° di persone' : '',
          value: datiRichiesta001 && datiRichiesta001.numeroPersone,
        },
        {
          flag: datiRichiesta001,
          field: 'Orario di lavoro',
          value: datiRichiesta001 && `${datiRichiesta001.orario.tlValoreTestuale[locale]}`,
        },
        {
          flag: datiRichiesta001 && (servizio === 'Tata' || servizio === 'Badante') &&
          datiRichiesta001.casaFlag.flag,
          field: 'Cura della casa',
          value: datiRichiesta001 && datiRichiesta001.casaFlag.flag === '1' ?
            <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em" color="green" noShadow cursor="default" /> :
            <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default" />,
        },
      ],
    },
    {
      flag: datiRichiesta001 && servizio !== 'Colf' ,
      title:  servizio === 'Tata' ? 'Bambini da accudire' : servizio === 'Badante' ? 'Persone da assistere' : '',
      step: 2,
      data: [
        {
          flag: !datiRichiesta002,
          field: 'Da compilare',
          value: null,
        },
      ],
    },
    {
      flag: datiRichiesta003 && (servizio === 'Tata' || servizio === 'Badante') && datiRichiesta003.mansioni.length > 0,
      title:  servizio === 'Tata' ? 'Cura dei bambini' : servizio === 'Badante' ? 'Cura della persona' : '',
      step: 3,
      data: [
        {
          flag: datiRichiesta003 && datiRichiesta003.mansioni.length > 0,
          field: 'Mansioni richieste',
          value: datiRichiesta003 && datiRichiesta003,
        },
      ],
    },
    {
      flag: datiRichiesta004 && (servizio === 'Colf' || (datiRichiesta001 &&  datiRichiesta001.casaFlag.flag === '1')),
      title: 'Informazioni sulla casa',
      step: 4,
      data: [
        {
          flag: datiRichiesta004 && isNullOrUndefined(datiRichiesta004.superficieCasa),
          field: 'Da compilare',
          value: null,
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.superficieCasa),
          field: 'Superficie casa',
          value: datiRichiesta004 && datiRichiesta004.superficieCasa &&
          datiRichiesta004.superficieCasa.tlValoreTestuale[locale],
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.numeroStanze),
          field: 'N° stanze',
          value: datiRichiesta004 && datiRichiesta004.numeroStanze &&
          datiRichiesta004.numeroStanze.tlValoreTestuale[locale],
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.numeroBagni),
          field: 'N° bagni',
          value: datiRichiesta004 && datiRichiesta004.numeroBagni &&
          datiRichiesta004.numeroBagni.tlValoreTestuale[locale],
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.terrazzaFlag) && datiRichiesta004.terrazzaFlag.flag === '1' ,
          field: 'Terrazza/Balcone',
          value: datiRichiesta004 && datiRichiesta004.terrazzaFlag && datiRichiesta004.terrazzaFlag.flag ?
            datiRichiesta004.terrazzaFlag.flag === '1' ? 
            <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em"  color="green" noShadow cursor="default" /> : 
            <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em"  color="red" noShadow cursor="default" />
            : 'Non definito',
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.piano)
                && !isNullOrUndefined(datiRichiesta004.piano.txVal),
          field: 'Piano',
          value: datiRichiesta004 && datiRichiesta004.piano && datiRichiesta004.piano.txVal,
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.ascensoreFlag) &&
          datiRichiesta004.ascensoreFlag.flag === '1',
          field: 'Ascensore',
          value: datiRichiesta004 && datiRichiesta004.ascensoreFlag && datiRichiesta004.ascensoreFlag.flag ? 
            datiRichiesta004.ascensoreFlag.flag === '1' ?             
            <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em" color="green" noShadow cursor="default"/> : 
            <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default"/>
            : 'Non definito',
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.giardinoFlag) && 
          !isNullOrUndefined(datiRichiesta004.giardinoFlag.nrVal) &&
          datiRichiesta004.giardinoFlag.flag === '1',
          field: 'Giardino',
          value: <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em"  color="green" noShadow cursor="default" />,
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.giardinoFlag) &&
            !isNullOrUndefined(datiRichiesta004.giardinoFlag.nrVal) &&
            datiRichiesta004.giardinoFlag.flag === '1',
          field: 'Estensione giardino',
          value: datiRichiesta004 && datiRichiesta004.giardinoFlag &&
            `${datiRichiesta004.giardinoFlag.nrVal} m2`,
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.abitazione),
          field: 'Tipologia abitazione',
          value: datiRichiesta004 && datiRichiesta004.abitazione && 
          datiRichiesta004.abitazione.tlValoreTestuale[locale],
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.fumatoriFlag) && datiRichiesta004.fumatoriFlag.flag === '1' ,
          field: 'Fumatori',
          value: datiRichiesta004 && datiRichiesta004.fumatoriFlag && datiRichiesta004.fumatoriFlag.flag ? 
            datiRichiesta004.fumatoriFlag.flag === '1' ? 
            <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em" color="green" noShadow cursor="default"/> : 
            <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default"/>
            : 'Non definito',
        },
        {
          flag: datiRichiesta004 && !isNullOrUndefined(datiRichiesta004.mansioni) &&
          datiRichiesta004.mansioni.length > 0,
          field: 'Mansioni richieste',
          value: datiRichiesta004 && datiRichiesta004,
        },
      ],
    },

    {
      flag: datiRichiesta005,
      title: 'Cura degli animali',
      step: 5,
      data: [
        {
          flag: datiRichiesta005 && isNullOrUndefined(datiRichiesta005.animaliFlag),
          field: 'Da compilare',
          value: null,
        },
        {
          flag: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.animaliFlag),
          field: 'Presenza animali',
          value: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.animaliFlag) ?
            datiRichiesta005.animaliFlag.flag === '1' ? 
            <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em"  color="green" noShadow cursor="default" /> : 
            <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em"  color="red" noShadow cursor="default" />
            : 'Non definito',
        },
        {
          flag: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.animaliFlag) &&
          datiRichiesta005.animaliFlag.flag === '1',
          field: 'N° cani',
          value: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.numeroCani) &&
            !isNullOrUndefined(datiRichiesta005.numeroCani.nrVal) ?
            datiRichiesta005.numeroCani.nrVal :
            <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default"/>,
        },
        {
          flag: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.animaliFlag) &&
          datiRichiesta005.animaliFlag.flag === '1',
          field: 'N° gatti',
          value: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.numeroGatti) &&
            !isNullOrUndefined(datiRichiesta005.numeroGatti.nrVal) ?
            datiRichiesta005.numeroGatti.nrVal :
            <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em" color="red" noShadow cursor="default"/>,
        },
        {
          flag: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.animaliFlag) &&
          datiRichiesta005.animaliFlag.flag === '1',
          field: 'Presenza altri animali',
          value: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.altriAnimaliFlag) ?
            datiRichiesta005.altriAnimaliFlag.flag === '1' ?
            <FaIcon icon="\f00c" fontSize="f6" width="1em" height="1em"  color="green" noShadow cursor="default" /> :
            <FaIcon icon="\f00d" fontSize="f6" width="1em" height="1em"  color="red" noShadow cursor="default" />
            : 'Non definito',
        },
        {
          flag: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.dettaglioAnimali) &&
            !isNullOrUndefined(datiRichiesta005.animaliFlag) &&
            datiRichiesta005.animaliFlag.flag === '1' &&
            !isNullOrUndefined(datiRichiesta005.altriAnimaliFlag) &&
          datiRichiesta005.altriAnimaliFlag.flag === '1',
          field: 'Dettaglio altri animali',
          value: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.dettaglioAnimali) &&
            datiRichiesta005.dettaglioAnimali.txVal,
        },
        {
          flag: datiRichiesta005 && !isNullOrUndefined(datiRichiesta005.mansioni) &&
            datiRichiesta005.mansioni.length > 0 &&
            !isNullOrUndefined(datiRichiesta005.animaliFlag) &&
          datiRichiesta005.animaliFlag.flag === '1',
          field: 'Mansioni richieste',
          value: datiRichiesta005 && datiRichiesta005,
        },
      ],
    },

    ripielogoDatiRichiesta007,
  ] : [];

  return (
    <StyledNavWrapper>
      <Row fluid justifycontent="space-between" padding="0 1em 0 0">
        <Column xs="12" md="3" padding="1em 20px">
          <Row fluid>
            <Text
              value="Per il servizio"
              padding="0 0.5em 0 0"
              size="f7"
              color="darkGrey"
            />
            <Text
              value={servizio}
              padding="0 0.5em 0 0"
              size="f7"
              color="blue"
              weight="bold"
            />
            <Text
              value="nella modalità:"
              padding="0 0.5em 0 0"
              size="f7"
              color="darkGrey"
            />
          </Row>
          <Row fluid margin=".5em 0 1em" flex direction="column">
            <Text
              value={modalitaAssunzione}
              color="blue"
              size="f6"
              weight="bold"
            />
            <Text
              value="€ -- --"
              color="primary"
              size="f3"
              weight="bold"
            />
          </Row>
        </Column>
        <Column xs="12" md="9" padding="1em 20px">
          <Scrollbar style={scrollbarStyle}>
            {riepilogoMock.map((el, index) => {
              return el.flag && (
                <Row key={index.toString()} fluid margin="0 0 2em" padding="0 2em 0 0" >
                  <Row fluid>
                    <TabLink
                      onClick={() => {
                        TCBStepper({ tcbStep: el.step });
                        setOpen.bind(this);
                        setOpen(false);
                      }}
                      value={el.title}
                      padding="0 0.5em 1em 0"
                      size="f6"
                      color="blue"
                      weight="bold"
                    />
                  </Row>
                  {
                    el.data.map((el2, index2) => {
                      return el2.flag && (
                        <SummaryRow fluid key={index2.toString()}>
                          <Column xs="12" md="4" padding="0.5em 0">
                            <Text
                              value={el2.field}
                              size="f7"
                              color={!el2.value && !el2.values ? 'red' : "primary"}
                              transform="uppercase"
                              letterSpacing="0.05em"
                            />
                          </Column>
                          <Column xs="12" md="8" padding="0.5em 0 1em 2em">
                            {
                              el2.value &&
                              el2.field !== `Mansioni richieste` ? 
                              typeof el2.value === 'string' ?
                              <Text 
                                value={el2.value}
                                padding="0 0.5em 0 0"
                                size="f7"
                                color="darkGrey"
                              /> :
                              el2.value :
                              null
                            }
                            {
                              el2.value &&
                              el2.field === 'Mansioni richieste' ?
                              el2.value.mansioni.map((mans, index3) => {
                                return (
                                  <Row fluid key={index3.toString()}>
                                    <List
                                      display="block"
                                      key={index3.toString()}
                                      size="f7"
                                      color="darkGrey"
                                      value={
                                        mans.cdDominioTcb === 0 ? mans.txVal ? mans.txVal : el2.value.altroValue ? el2.value.altroValue : '' : typeof mans.txTitoloMansione === 'string' ?
                                        mans.txTitoloMansione :
                                        mans.txTitoloMansione[locale]
                                      }
                                      dotproportion="0.6"
                                      dotcolor="primary"
                                      radius="50%"
                                    />
                                    {
                                      mans.attributoTcb &&
                                      (
                                        <Column
                                          xs="11"
                                          xsShift="1"
                                          padding="0 0 .5em"
                                          justifycontent="flex-end"
                                        >
                                          <Text
                                            value={"Per le seguenti fasce d'età:"}
                                            tag="p"
                                            size="f8"
                                            color="darkGrey"
                                          />
                                            {
                                              mans.attributoTcb.map((fascia, index4) => (
                                                <Row fluid key={index4.toString()}>
                                                  <List
                                                    display="block"
                                                    size="f7"
                                                    dotproportion="0.4"
                                                    dotcolor="darkGrey"
                                                    color="darkGrey"
                                                    value={fascia.tlValoreTestuale}
                                                  />
                                                </Row>
                                              ))
                                            }
                                        </Column>
                                      )
                                    }
                                  </Row>
                                );
                              })
                              : ''
                            }
                            {
                              el2.values &&
                              Array.isArray(el2.values) &&
                              el2.values.map((multiSelectValue, index3) => {
                                return (
                                  <Row fluid key={index3.toString()}>
                                    <List
                                      display="block"
                                      key={index3.toString()}
                                      size="f7"
                                      color="darkGrey"
                                      value={multiSelectValue}
                                      dotproportion="0.6"
                                      dotcolor="primary"
                                      radius="50%"
                                    />
                                  </Row>
                                );
                              })
                            }
                          </Column>
                        </SummaryRow>
                      );
                    })
                  }
                </Row>
              );
            })}
          </Scrollbar>
        </Column>
      </Row>
    </StyledNavWrapper>
  );
};

TCBRequestSummary.displayName = 'TCBRequestSummary';

const mapDispatchToProps = ({
  graphqlRequest,
  TCBStepper,
});

const mapStoreToProps = store => ({
  tcbStep: store.stepperTCB.tcbStep,
  locale: store.locale,
  loaded: store.graphql.loaded,
  datiRichiesta001: store.graphql.EstraiDatiConfigurazioneRichiesta001,
  datiRichiesta002: store.graphql.EstraiDatiConfigurazioneRichiesta002,
  datiRichiesta003: store.graphql.EstraiDatiConfigurazioneRichiesta003,
  datiRichiesta004: store.graphql.EstraiDatiConfigurazioneRichiesta004,
  datiRichiesta005: store.graphql.EstraiDatiConfigurazioneRichiesta005,
  datiRichiesta007: store.graphql.EstraiDatiReferenzaLavoratore,
});

export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(TCBRequestSummary));

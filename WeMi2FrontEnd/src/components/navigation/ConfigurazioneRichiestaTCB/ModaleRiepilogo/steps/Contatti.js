/* eslint-disable no-undef */
import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { fiscalCodeRegex } from 'libs/Form/validation/regex';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import styled from 'styled-components';
import { colors } from 'theme';
import Wrapper from '../partials/Wrapper';
import SectionTitle from '../partials/SectionTitle';
import FieldText from '../partials/FieldText';
import { cdAttributo } from '../../CodiciAttributi';
import { EstraiStatoNascia as EstraiStatoNasciaQ } from '../stepsGraphql';
import { TextCampoObbligatorio, formattedDate } from '../utils';

const StyledRow = styled(Row)`
  border-bottom: 1px solid ${colors.grey};
  padding: 0.2em 0;
  ${props => props.textarea ? 'min-height: 3em;' : ''}
  @media print {
    break-inside: avoid;
    display: table;
  }
`;

const DatiPreliminari = ({
  title,
  moveTo,
  servizioTCB,
  locale,
  loading,
  errored,
  data,
}) => {

  const [estraiStato] = useGraphQLRequest(
    undefined,
    EstraiStatoNasciaQ,
    {},
    true
  )

  const findStatoNascita = (id) => {
    let ris;
    estraiStato.data.forEach(element => {
      if (element.cdDominioTcb === parseInt(id)) {
        ris = element.tlValoreTestuale[locale];
      }
    });
    return ris;
  };

  let nome;
  let cognome;
  let comuneNascita;
  let dataNascita;
  let CF;
  let telefono;
  let email;
  let via;
  let cap;
  let comuneResidenza;
  let statoNascita;
  let CfIsValid = false;

  if (data && estraiStato.data) {
    data.forEach(element => {
      switch (element.cd_attributo) {
        case cdAttributo.TX_NOME_CONTATTO:
          nome = element.tx_val;
          break;
        case cdAttributo.TX_COGNOME_CONTATTO:
          cognome = element.tx_val;
          break;
        case cdAttributo.TX_LUOGO_DI_NASCITA_CONTATTO:
          comuneNascita = element.tx_val;
          break;
        case cdAttributo.DT_NASCITA_CONTATTO:
          dataNascita = formattedDate(element.dt_val);
          break;
        case cdAttributo.TX_CODICE_FISCALE_CONTATTO:
          CF = element.tx_val;
          CfIsValid = fiscalCodeRegex.test(CF);
          break;
        case cdAttributo.TX_TELEFONO_CONTATTO:
          telefono = element.tx_val;
          break;
        case cdAttributo.TX_EMAIL_CONTATTO:
          email = element.tx_val;
          break;
        case cdAttributo.TX_INDIRIZZO_SEDE_DI_LAVORO:
          via = element.tx_val;
          break;
        case cdAttributo.TX_COMUNE_SEDE_DI_LAVORO:
          comuneResidenza = element.tx_val;
          break;
        case cdAttributo.FIX_CAP:
          cap = element.tx_val;
          break;
        case cdAttributo.CD_STATO_DI_NASCITA_CONTATTO:
          statoNascita = findStatoNascita(element.cd_val_attributo);
          break;
        default:
        // code block
      }
    });
  }

  const checkValuesDatiAnagrafici = () => {
    if (!nome) {
      return true;
    }
    if (!cognome) {
      return true;
    }
    if (!comuneNascita) {
      return true;
    }
    if (!statoNascita) {
      return true;
    }
    if (!dataNascita) {
      return true;
    }
    if (!CF) {
      return true;
    }
    if (!telefono) {
      return true;
    }
    if (!email) {
      return true;
    }

    return false;
  };

  return (
    <>
      <SectionTitle
        title={title}
        moveTo={moveTo}
      />
      <Wrapper
        loading={loading}
        errored={errored}
      >
        <>
          <StyledRow
            fluid
            margin="0"
            alignitems="flex-start"
          >
            <Column xs="12" md="4" padding="0">
              <Text
                value="Dati anagrafici"
                size="f7"
                color="black"
                weight="bold"
              />
            </Column>
            <Column xs="12" md="8" padding="0">
              <Text
                value={`${nome || ''} 
                ${cognome || ''}
                ${comuneNascita ? `, nato/a a ${comuneNascita}` : ''} 
                ${statoNascita ? `, ${statoNascita}` : ''} 
                ${dataNascita ? `, il ${dataNascita}` : ''}`}
                size="f7"
                color="black"
              />
              {
                CF ? (
                  <>
                    &nbsp;
                    <Text
                      value={`(C.F. ${CF}`}
                      size="f7"
                      color="black"
                    />
                    {
                      !CfIsValid ? (
                        <>
                          &nbsp;
                          <TextCampoObbligatorio
                            value="* codice fiscale non valido"
                          />
                        </>
                      )
                        : null
                    }
                    <Text
                      value=")"
                      size="f7"
                      color="black"
                    />
                  </>
                )
                  : null
              }
              &nbsp;
              <Text
                value={`${telefono ? `Telefono: ${telefono}` : ''} 
                ${email ? `/ E-mail: ${email}` : ''}`}
                size="f7"
                color="black"
              />
              {
                checkValuesDatiAnagrafici() ? (
                  <>
                    &nbsp;
                    <TextCampoObbligatorio
                      value="* Dati anagrafici incompleti"
                    />
                  </>
                )
                  : null
              }
            </Column>
          </StyledRow>
          <FieldText
            title="Sede di lavoro"
            array={
              via && cap && comuneResidenza ?
                [
                  { value: via },
                  { value: cap },
                  { value: comuneResidenza }
                ]
                : []
            }
            required
          />

        </>
      </Wrapper>
    </>
  );
};

DatiPreliminari.displayName = 'DatiPreliminari';

export default DatiPreliminari;
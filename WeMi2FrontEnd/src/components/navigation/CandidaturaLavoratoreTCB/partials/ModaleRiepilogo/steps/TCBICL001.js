/** @format */

import React from 'react';
import moment from 'moment';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { colors } from 'theme';
import { Form } from 'libs/Form/components/Form';
import yup from 'libs/Form/validation/yup';
import { emailRegex, telefonoRegex } from 'libs/Form/validation/regex';
import Title from '../partials/Title';
import FieldText from '../partials/FieldText';
import FieldCheck from '../partials/FieldCheck';
import { codiciAttributo } from '../../../constants/CodiciAttributo';
import { estraiDatiAnagraficiFormFieldsValues as estraiDatiAnagraficiFormFieldsValuesQ } from '../summaryGraphQL';

const validationSchema = yup.object().shape({
  email: yup.string().email('Formato e-mail non valido.').matches(emailRegex),
  telefono: yup.string().matches(telefonoRegex, 'Numero di telefono non valido.'),
  telefono2: yup.string().matches(telefonoRegex, 'Numero di telefono non valido.'),
});


const TCBICL001 = ({
  Dati,
  locale,
  onPatchStep,
}) => {
  const [datiAnagrafici] = useGraphQLRequest(
    undefined,
    estraiDatiAnagraficiFormFieldsValuesQ,
    undefined,
    true
  );

  let nome;
  let cognome;
  let sesso;
  let luogoNascita;
  let statoNascita;
  let dataNascita;
  let cf;
  let cittadinanza;
  let nrCartaIdentita;
  let dataRilascioCartaIdentita;
  let dataScadenzaCartaIdentita;
  let comuneRilascioCartaIdentita;
  let nrPassaporto;
  let dataRilascioPassaporto;
  let dataScadenzaPassaporto;
  let enteRilasciatoPassaporto;
  let motivoPermesso;
  let nrPermesso;
  let dataRilascioPermesso;
  let dataScadenzaPermesso;
  let dataRinnovoPermesso;
  let richiestaRinnovoPermesso;
  let enteRilasciatoPermesso;
  let indirizzoDomicilio;
  let comuneDomicilio;
  let indirizzoResidenza;
  let comuneResidenza;
  let telefono;
  let telefono2;
  let email;
  // variabile con la quale abbiamo il controllo se la data di scadenza è minore della data odierna
  let isDataScadenzaBeforeToday = false;

  datiAnagrafici.data && Dati.map((ele) => {
    switch (ele.cd_attributo) {
      case codiciAttributo.TX_NOME_UTENTE:
        nome = ele.tx_val;
        break;
      case codiciAttributo.TX_COGNOME_UTENTE:
        cognome = ele.tx_val;
        break;
      case codiciAttributo.CD_SESSO_UTENTE:
        datiAnagrafici.data.sessoFieldValues.forEach(element => {
          if (element.cdDominioTcb === ele.cd_val_attributo) {
            sesso = element.tlValoreTestuale[locale];
          }
        });
        break;
      case codiciAttributo.TX_LUOGO_DI_NASCITA_UTENTE:
        luogoNascita = ele.tx_val;
        break;
      case codiciAttributo.CD_STATO_DI_NASCITA_UTENTE:
        datiAnagrafici.data.statoNascitaFieldValues.forEach(element => {
          if (element.cdDominioTcb === ele.cd_val_attributo) {
            statoNascita = element.tlValoreTestuale[locale];
          }
        });
        break;
      case codiciAttributo.DT_NASCITA_UTENTE:
        dataNascita = ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
        break;
      case codiciAttributo.TX_CODICE_FISCALE:
        cf = ele.tx_val;
        break;
      case codiciAttributo.TX_NR_CARTA_DI_IDENTITA:
        nrCartaIdentita = ele.tx_val;
        break;
      case codiciAttributo.DT_RILASCIO_CARTA_DI_IDENTITA:
        dataRilascioCartaIdentita = ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
        break;
      case codiciAttributo.DT_SCADENZA_CARTA_DI_IDENTITA:
        dataScadenzaCartaIdentita = ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
        break;
      case codiciAttributo.TX_COMUNE_DI_RILASCIO_CARTA_DI_IDENTITA:
        comuneRilascioCartaIdentita = ele.tx_val;
        break;
      case codiciAttributo.TX_NR_PASSAPORTO:
        nrPassaporto = ele.tx_val;
        break;
      case codiciAttributo.DT_DATA_RILASCIO_PASSAPORTO:
        dataRilascioPassaporto = ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
        break;
      case codiciAttributo.DT_DATA_SCADENZ_PASSAPORTO:
        dataScadenzaPassaporto = ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
        break;
      case codiciAttributo.TX_ENTE_RILASCIO_PASSAPORTO:
        enteRilasciatoPassaporto = ele.tx_val;
        break;
      case codiciAttributo.TX_MOTIVO_PS:
        motivoPermesso = ele.tx_val;
        break;
      case codiciAttributo.TX_NR_PS:
        nrPermesso = ele.tx_val || null;
        break;
      case codiciAttributo.TX_DATA_RILASCIO_PS:
        dataRilascioPermesso = ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
        break;
      case codiciAttributo.TX_DATA_SCADENZA_PS:
        dataScadenzaPermesso = ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
        isDataScadenzaBeforeToday = moment(ele.dt_val).startOf('day').toDate() < moment().startOf('day').toDate();
        break;
      case codiciAttributo.TX_QUESTURA_RILASCIO_PS:
        enteRilasciatoPermesso = ele.tx_val || null;
        break;
      case codiciAttributo.DT_DATA_RICHIESTA_RINNOVO_PS:
        dataRinnovoPermesso = ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
        break;
      case codiciAttributo.TX_INDIRIZZO_DOMICILIO:
        indirizzoDomicilio = ele.tx_val;
        break;
      case codiciAttributo.TX_COMUNE_DOMICILIO:
        comuneDomicilio = ele.tx_val;
        break;
      case codiciAttributo.TX_INDIRIZZO_RESIDENZA:
        indirizzoResidenza = ele.tx_val;
        break;
      case codiciAttributo.TX_COMUNE_RESIDENZA:
        comuneResidenza = ele.tx_val;
        break;
      case codiciAttributo.TX_RECAPITO_TELEFONICO:
        telefono = ele.tx_val;
        break;
      case codiciAttributo.TX_RECAPITO_TELEFONICO_2:
        telefono2 = ele.tx_val;
        break;
      case codiciAttributo.TX_EMAIL:
        email = ele.tx_val;
        break;
      case codiciAttributo.CD_CITTADINANZA_UTENTE:
        cittadinanza = datiAnagrafici.data.statoNascitaFieldValues.find(element => (
          ele.cd_val_attributo === element.cdDominioTcb
        ));
        cittadinanza = cittadinanza.tlValoreTestuale[locale];
        break;
      default:
      // code block
    }
  });

  if (datiAnagrafici.isLoading || datiAnagrafici.pristine || datiAnagrafici.errored) {
    return <></>;
  }
  return (
    <Form
      initialDataset={{
        nome,
        cognome,
        sesso,
        luogoNascita,
        statoNascita,
        dataNascita,
        cf,
        cittadinanza,
        nrCartaIdentita,
        dataRilascioCartaIdentita,
        dataScadenzaCartaIdentita,
        comuneRilascioCartaIdentita,
        nrPassaporto,
        dataRilascioPassaporto,
        dataScadenzaPassaporto,
        enteRilasciatoPassaporto,
        motivoPermesso,
        nrPermesso,
        dataRilascioPermesso,
        dataScadenzaPermesso,
        dataRinnovoPermesso,
        richiestaRinnovoPermesso,
        enteRilasciatoPermesso,
        indirizzoDomicilio,
        comuneDomicilio,
        indirizzoResidenza,
        comuneResidenza,
        telefono,
        telefono2,
        email,
      }}
      validateOnMount
      validationSchema={validationSchema}
    >
      {({ errors }) => (
        <>
          <Title
            title="Dati anagrafici"
            onPatchStep={onPatchStep}
            index={0}
          />
          <FieldText
            title="Nome"
            value={nome}
            required
          />
          <FieldText
            title="Cognome"
            value={cognome}
            required
          />
          <FieldText
            title="Sesso"
            value={sesso}
            required
          />
          <FieldText
            title="Luogo di nascita"
            value={luogoNascita}
            required
          />
          <FieldText
            title="Stato di nascita"
            value={statoNascita}
            required
          />
          <FieldText
            title="Data di nascita"
            value={dataNascita}
            required
          />
          <FieldText
            title="Cittadinanza"
            value={cittadinanza}
            required
          />
          <FieldText
            title="Codice Fiscale"
            value={cf}
            required
            colorBorder={colors.black}
          />
          {
            (nrCartaIdentita || dataRilascioCartaIdentita || dataScadenzaCartaIdentita || comuneRilascioCartaIdentita) ? (
              <>
                <FieldText
                  title="N° carta d'identità"
                  value={nrCartaIdentita}
                  required
                />
                <FieldText
                  title="Data rilascio carta d'identità"
                  value={dataRilascioCartaIdentita}
                  required
                />
                <FieldText
                  title="Data scadenza carta d'identità"
                  value={dataScadenzaCartaIdentita}
                  required
                />
                <FieldText
                  title="Comune di rilascio della carta d'identità"
                  value={comuneRilascioCartaIdentita}
                  required
                  colorBorder={colors.black}
                />
              </>
            )
              : (
                <FieldCheck
                  title="Carta d'identità"
                />
              )}
          {
            (nrPassaporto || dataRilascioPassaporto || dataScadenzaPassaporto || enteRilasciatoPassaporto) ? (
              <>
                <FieldText
                  title="N° passaporto"
                  value={nrPassaporto}
                  required
                />
                <FieldText
                  title="Data rilascio passaporto"
                  value={dataRilascioPassaporto}
                  required
                />
                <FieldText
                  title="Data scadenza passaporto"
                  value={dataScadenzaPassaporto}
                  required
                />
                <FieldText
                  title="Passaporto rilasciato da"
                  value={enteRilasciatoPassaporto}
                  required
                  colorBorder={colors.black}
                />
              </>
            )
              : (
                <FieldCheck
                  title="Passaporto"
                />
              )}
          {
            (motivoPermesso || nrPermesso || dataRilascioPermesso || dataScadenzaPermesso || enteRilasciatoPermesso || dataRinnovoPermesso) ? (
              <>
                <FieldText
                  title="Motivo permesso di soggiorno"
                  value={motivoPermesso}
                  required
                />
                <FieldText
                  title="N° permesso di soggiorno"
                  value={nrPermesso}
                  required
                />
                <FieldText
                  title="Data rilascio permesso di soggiorno"
                  value={dataRilascioPermesso}
                  required
                />
                <FieldText
                  title="Questura di rilascio"
                  value={enteRilasciatoPermesso}
                  required
                />
                <FieldText
                  title="Data scadenza permesso di soggiorno"
                  value={dataScadenzaPermesso}
                  required
                />
                {dataRinnovoPermesso ? (
                  <FieldText
                    title="Data della richiesta di rinnovo"
                    value={dataRinnovoPermesso}
                    colorBorder={colors.black}
                  />
                )
                  :
                  isDataScadenzaBeforeToday ? (
                    <FieldCheck
                      title="Richiesta di rinnovo del permesso di soggiorno"
                      colorBorder={colors.black}
                    />
                  )
                    : null
                }
              </>
            )
              : (
                <FieldCheck
                  title="Permesso di soggiorno"
                />
              )}
          <FieldText
            title="Indirizzo del domicilio"
            value={indirizzoDomicilio}
            required
          />
          <FieldText
            title="Comune del domicilio "
            value={comuneDomicilio}
            required
          />
          {
            comuneResidenza === comuneDomicilio &&
              indirizzoResidenza === indirizzoDomicilio &&
              !isNullOrUndefined(comuneDomicilio) &&
              !isNullOrUndefined(indirizzoDomicilio) ? (
              <FieldCheck
                title="La residenza coincide con il domicilio"
                checked
              />
            ) : (
              <>
                <FieldText
                  title="Indirizzo di residenza"
                  value={indirizzoResidenza}
                  required
                />
                <FieldText
                  title="Comune di residenza"
                  value={comuneResidenza}
                  required
                />
              </>
            )}
          <FieldText
            title="Telefono 1"
            value={telefono}
            error={errors.telefono}
            required
          />
          <FieldText
            title="Telefono 2"
            value={telefono2}
            error={errors.telefono2}
          />
          <FieldText
            title="E-mail"
            value={email}
            required
            error={errors.email}
          />

        </>
      )}

    </Form>
  );
};

TCBICL001.displayName = 'TCBICL001';

export default TCBICL001;


import moment from 'moment';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { codiciAttributo } from '../../../constants/CodiciAttributo';

export const mapDbData = dbData => {
  const json = {};

  /** Ciclo i dati che arrivano da DB e definisco un oggetto con in chiave il codice attributo e per valore il valore estratto */
  dbData.forEach(el => {
    if (el.cdAttributo === codiciAttributo.TX_NOME_UTENTE) {
      json[codiciAttributo.TX_NOME_UTENTE] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_COGNOME_UTENTE) {
      json[codiciAttributo.TX_COGNOME_UTENTE] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.CD_SESSO_UTENTE) {
      json[codiciAttributo.CD_SESSO_UTENTE] = el.cdValAttributo;
    }

    if (el.cdAttributo === codiciAttributo.TX_LUOGO_DI_NASCITA_UTENTE) {
      json[codiciAttributo.TX_LUOGO_DI_NASCITA_UTENTE] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.CD_STATO_DI_NASCITA_UTENTE) {
      json[codiciAttributo.CD_STATO_DI_NASCITA_UTENTE] = el.cdValAttributo;
    }

    if (el.cdAttributo === codiciAttributo.DT_NASCITA_UTENTE) {
      json[codiciAttributo.DT_NASCITA_UTENTE] = !isNullOrUndefined(el.dtVal) ? moment(el.dtVal).toDate() : undefined;
    }

    if (el.cdAttributo === codiciAttributo.TX_CODICE_FISCALE) {
      json[codiciAttributo.TX_CODICE_FISCALE] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.CD_CITTADINANZA_UTENTE) {
      json[codiciAttributo.CD_CITTADINANZA_UTENTE] = el.cdValAttributo;
    }

    if (el.cdAttributo === codiciAttributo.TX_NR_CARTA_DI_IDENTITA) {
      json[codiciAttributo.TX_NR_CARTA_DI_IDENTITA] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.DT_RILASCIO_CARTA_DI_IDENTITA) {
      json[codiciAttributo.DT_RILASCIO_CARTA_DI_IDENTITA] = !isNullOrUndefined(el.dtVal) ? moment(el.dtVal).toDate() : undefined;
    }

    if (el.cdAttributo === codiciAttributo.DT_SCADENZA_CARTA_DI_IDENTITA) {
      json[codiciAttributo.DT_SCADENZA_CARTA_DI_IDENTITA] = !isNullOrUndefined(el.dtVal) ? moment(el.dtVal).toDate() : undefined;
    }

    if (el.cdAttributo === codiciAttributo.TX_COMUNE_DI_RILASCIO_CARTA_DI_IDENTITA) {
      json[codiciAttributo.TX_COMUNE_DI_RILASCIO_CARTA_DI_IDENTITA] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_NR_PASSAPORTO) {
      json[codiciAttributo.TX_NR_PASSAPORTO] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.DT_DATA_RILASCIO_PASSAPORTO) {
      json[codiciAttributo.DT_DATA_RILASCIO_PASSAPORTO] = !isNullOrUndefined(el.dtVal) ? moment(el.dtVal).toDate() : undefined;
    }

    if (el.cdAttributo === codiciAttributo.DT_DATA_SCADENZ_PASSAPORTO) {
      json[codiciAttributo.DT_DATA_SCADENZ_PASSAPORTO] = !isNullOrUndefined(el.dtVal) ? moment(el.dtVal).toDate() : undefined;
    }

    if (el.cdAttributo === codiciAttributo.TX_ENTE_RILASCIO_PASSAPORTO) {
      json[codiciAttributo.TX_ENTE_RILASCIO_PASSAPORTO] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_MOTIVO_PS) {
      json[codiciAttributo.TX_MOTIVO_PS] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_NR_PS) {
      json[codiciAttributo.TX_NR_PS] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_DATA_RILASCIO_PS) {
      json[codiciAttributo.TX_DATA_RILASCIO_PS] = !isNullOrUndefined(el.dtVal) ? moment(el.dtVal).toDate() : undefined;
    }

    if (el.cdAttributo === codiciAttributo.TX_DATA_SCADENZA_PS) {
      json[codiciAttributo.TX_DATA_SCADENZA_PS] = !isNullOrUndefined(el.dtVal) ? moment(el.dtVal).toDate() : undefined;
    }

    if (el.cdAttributo === codiciAttributo.TX_QUESTURA_RILASCIO_PS) {
      json[codiciAttributo.TX_QUESTURA_RILASCIO_PS] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_COMUNE_DOMICILIO) {
      json[codiciAttributo.TX_COMUNE_DOMICILIO] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_INDIRIZZO_DOMICILIO) {
      json[codiciAttributo.TX_INDIRIZZO_DOMICILIO] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_COMUNE_RESIDENZA) {
      json[codiciAttributo.TX_COMUNE_RESIDENZA] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_INDIRIZZO_RESIDENZA) {
      json[codiciAttributo.TX_INDIRIZZO_RESIDENZA] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_RECAPITO_TELEFONICO) {
      json[codiciAttributo.TX_RECAPITO_TELEFONICO] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_RECAPITO_TELEFONICO_2) {
      json[codiciAttributo.TX_RECAPITO_TELEFONICO_2] = el.txVal;
    }

    if (el.cdAttributo === codiciAttributo.TX_EMAIL) {
      json[codiciAttributo.TX_EMAIL] = el.txVal;
    }
    if (el.cdAttributo === codiciAttributo.DT_DATA_RICHIESTA_RINNOVO_PS) {
      json[codiciAttributo.DT_DATA_RICHIESTA_RINNOVO_PS] = !isNullOrUndefined(el.dtVal) ? moment(el.dtVal).toDate() : undefined;
    }
  });
  return json;
};

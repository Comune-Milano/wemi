import { mapDbData } from './mapDbData';
import { codiciAttributo } from '../../../constants/CodiciAttributo';

export const getInitialDataset = (dbData, userInfo) => {
  /** Creo una mappatura tra i dati che arrivano da Db e la struttura del dataset */
  const mappedDbData = mapDbData(dbData);

  function checkDatiAccountFlag() {
    if (userInfo && (
      mappedDbData[codiciAttributo.TX_NOME_UTENTE] === userInfo.nome || (!mappedDbData[codiciAttributo.TX_NOME_UTENTE] && !userInfo.nome)
    ) && (
      mappedDbData[codiciAttributo.TX_COGNOME_UTENTE] === userInfo.cognome || (!mappedDbData[codiciAttributo.TX_COGNOME_UTENTE] && !userInfo.cognome)
    ) && (
      mappedDbData[codiciAttributo.CD_SESSO_UTENTE] === userInfo.sesso || (!mappedDbData[codiciAttributo.CD_SESSO_UTENTE] && !userInfo.sesso)
    ) && (
      mappedDbData[codiciAttributo.TX_CODICE_FISCALE] === userInfo.codiceFiscale || (!mappedDbData[codiciAttributo.TX_CODICE_FISCALE] && !userInfo.codiceFiscale)
    )) {
      return true;
    }
    return false;
  }


  /** Definisco il dataset iniziale del form */
  const datiAnagrafici = {
    datiAccount: checkDatiAccountFlag(),
    nome: mappedDbData[codiciAttributo.TX_NOME_UTENTE],
    cognome: mappedDbData[codiciAttributo.TX_COGNOME_UTENTE],
    sesso: mappedDbData[codiciAttributo.CD_SESSO_UTENTE],
    luogoNascita: mappedDbData[codiciAttributo.TX_LUOGO_DI_NASCITA_UTENTE],
    statoNascita: mappedDbData[codiciAttributo.CD_STATO_DI_NASCITA_UTENTE],
    dataNascita: mappedDbData[codiciAttributo.DT_NASCITA_UTENTE],
    codiceFiscale: mappedDbData[codiciAttributo.TX_CODICE_FISCALE],
    cittadinanza: mappedDbData[codiciAttributo.CD_CITTADINANZA_UTENTE],
  };

  const cartaIdentita = {
    checkCarta: (mappedDbData[codiciAttributo.TX_NR_CARTA_DI_IDENTITA] ||
      mappedDbData[codiciAttributo.DT_RILASCIO_CARTA_DI_IDENTITA] ||
      mappedDbData[codiciAttributo.DT_SCADENZA_CARTA_DI_IDENTITA] ||
      mappedDbData[codiciAttributo.TX_COMUNE_DI_RILASCIO_CARTA_DI_IDENTITA]
    ) ? 1 : 2,
    numero: mappedDbData[codiciAttributo.TX_NR_CARTA_DI_IDENTITA],
    dataRilascio: mappedDbData[codiciAttributo.DT_RILASCIO_CARTA_DI_IDENTITA],
    dataScadenza: mappedDbData[codiciAttributo.DT_SCADENZA_CARTA_DI_IDENTITA],
    rilasciatoDa: mappedDbData[codiciAttributo.TX_COMUNE_DI_RILASCIO_CARTA_DI_IDENTITA],
  };

  const passaporto = {
    checkPassaporto: (mappedDbData[codiciAttributo.TX_NR_PASSAPORTO] ||
      mappedDbData[codiciAttributo.DT_DATA_RILASCIO_PASSAPORTO] ||
      mappedDbData[codiciAttributo.DT_DATA_SCADENZ_PASSAPORTO] ||
      mappedDbData[codiciAttributo.TX_ENTE_RILASCIO_PASSAPORTO]
    ) ? 1 : 2,
    numero: mappedDbData[codiciAttributo.TX_NR_PASSAPORTO],
    dataRilascio: mappedDbData[codiciAttributo.DT_DATA_RILASCIO_PASSAPORTO],
    dataScadenza: mappedDbData[codiciAttributo.DT_DATA_SCADENZ_PASSAPORTO],
    rilasciatoDa: mappedDbData[codiciAttributo.TX_ENTE_RILASCIO_PASSAPORTO],
  };

  const permessoSoggiorno = {
    checkPermessoSoggiorno: (mappedDbData[codiciAttributo.TX_MOTIVO_PS] ||
      mappedDbData[codiciAttributo.TX_NR_PS] ||
      mappedDbData[codiciAttributo.TX_DATA_RILASCIO_PS] ||
      mappedDbData[codiciAttributo.TX_DATA_SCADENZA_PS] ||
      mappedDbData[codiciAttributo.TX_QUESTURA_RILASCIO_PS] ||
      mappedDbData[codiciAttributo.DT_DATA_RICHIESTA_RINNOVO_PS]
    ) ? 1 : 2,
    motivo: mappedDbData[codiciAttributo.TX_MOTIVO_PS],
    numero: mappedDbData[codiciAttributo.TX_NR_PS],
    dataRilascio: mappedDbData[codiciAttributo.TX_DATA_RILASCIO_PS],
    dataScadenza: mappedDbData[codiciAttributo.TX_DATA_SCADENZA_PS],
    rilasciatoDa: mappedDbData[codiciAttributo.TX_QUESTURA_RILASCIO_PS],
    checkRichiestaRinnovo: !!mappedDbData[codiciAttributo.DT_DATA_RICHIESTA_RINNOVO_PS],
    dataRichiestaRinnovo: mappedDbData[codiciAttributo.DT_DATA_RICHIESTA_RINNOVO_PS],
  };
  const domicilio = {
    indirizzo: mappedDbData[codiciAttributo.TX_INDIRIZZO_DOMICILIO],
    comune: mappedDbData[codiciAttributo.TX_COMUNE_DOMICILIO],
  };
  const residenza = {
    comeDomicilio: (mappedDbData[codiciAttributo.TX_INDIRIZZO_RESIDENZA] === mappedDbData[codiciAttributo.TX_INDIRIZZO_DOMICILIO] &&
      mappedDbData[codiciAttributo.TX_COMUNE_RESIDENZA] === mappedDbData[codiciAttributo.TX_COMUNE_DOMICILIO])
      || false,
    indirizzo: mappedDbData[codiciAttributo.TX_INDIRIZZO_RESIDENZA],
    comune: mappedDbData[codiciAttributo.TX_COMUNE_RESIDENZA],
  };
  const contatti = {
    telefono1: mappedDbData[codiciAttributo.TX_RECAPITO_TELEFONICO],
    email: mappedDbData[codiciAttributo.TX_EMAIL],
    telefono2: mappedDbData[codiciAttributo.TX_RECAPITO_TELEFONICO_2],
  };

  return {
    datiAnagrafici,
    cartaIdentita,
    passaporto,
    permessoSoggiorno,
    domicilio,
    residenza,
    contatti,
  };
};

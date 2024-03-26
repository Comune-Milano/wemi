import moment from 'moment';
import { Attributi } from '.';

const arrayConfigurazone = (config008, errors) => {
  const arrayConfig = [
    {
      cd_attributo: Attributi.FG_CONTATTO_EQ_RICHIEDENTE,
      cd_val_attributo: 1,
      fg_val: config008.usaDatiAnagrafici ? '1' : '0',
    },
    {
      cd_attributo: 99,
      cd_val_attributo: 1,
      tx_val: config008.cap_utente ? config008.cap_utente : '',
    },
    {
      cd_attributo: Attributi.TX_COGNOME_CONTATTO,
      cd_val_attributo: 1,
      tx_val: config008.cognome_utente ? config008.cognome_utente : '',
    },
    {
      cd_attributo: Attributi.TX_NOME_CONTATTO,
      cd_val_attributo: 1,
      tx_val: config008.nome_utente ? config008.nome_utente : '',
    },
    {
      cd_attributo: Attributi.DT_NASCITA_CONTATTO,
      cd_val_attributo: config008.data_utente && !errors.data_utente ? 1 : -1,
      dt_val: config008.data_utente && !errors.data_utente ? moment(config008.data_utente).format('YYYY-MM-DD') : undefined,
    },
    {
      cd_attributo: Attributi.TX_LUOGO_DI_NASCITA_CONTATTO,
      cd_val_attributo: 1,
      tx_val: config008.luogo_utente ? config008.luogo_utente : '',
    },
    {
      cd_attributo: Attributi.CD_STATO_DI_NASCITA_CONTATTO,
      cd_val_attributo: config008.stato_utente && config008.stato_utente.id || -1,
    },
    {
      cd_attributo: Attributi.TX_CODICE_FISCALE_CONTATTO,
      cd_val_attributo: 1,
      tx_val: config008.codice_fiscale_utente ? config008.codice_fiscale_utente : '',
    },
    {
      cd_attributo: Attributi.TX_TELEFONO_CONTATTO,
      cd_val_attributo: 1,
      tx_val: config008.telefono_utente ? config008.telefono_utente : '',
    },
    {
      cd_attributo: Attributi.TX_EMAIL_CONTATTO,
      cd_val_attributo: 1,
      tx_val: config008.email_utente ? config008.email_utente : '',
    },
    {
      cd_attributo: Attributi.FG_SEDE_CONTATTO_EQ_RESIDENZA,
      cd_val_attributo: 1,
      fg_val: config008.usaDatiAccount ? '1' : '0',
    },
    {
      cd_attributo: Attributi.TX_INDIRIZZO_SEDE_DI_LAVORO,
      cd_val_attributo: 1,
      tx_val: config008.indirizzo_utente ? config008.indirizzo_utente : '',
    },
    {
      cd_attributo: Attributi.TX_COMUNE_SEDE_DI_LAVORO,
      cd_val_attributo: 1,
      tx_val: config008.comune_utente ? config008.comune_utente : '',
    },
    // {
    //   cd_attributo: Attributi.CD_MUNICIPIO_SEDE_DI_LAVORO,
    //   cd_val_attributo: config008.datiSede.municipio ? config008.municipio.idMunicipio : undefined,
    //   tx_val: config008.municipio ? config008.municipio.nmMunicipio : undefined
    // },
  ];

  return arrayConfig;
};

export default arrayConfigurazone;

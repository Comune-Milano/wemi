
import moment from 'moment';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { codiciAttributo } from '../../../constants/CodiciAttributo';

export function createArrayConfig(values, touched) {
  const arr = [];

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_NOME_UTENTE,
        cd_val_attributo: values.datiAnagrafici.nome && values.datiAnagrafici.nome.length ? 1 : -1,
        tx_val: values.datiAnagrafici.nome,
      },
    );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_COGNOME_UTENTE,
        cd_val_attributo: values.datiAnagrafici.cognome && values.datiAnagrafici.cognome.length ? 1 : -1,
        tx_val: values.datiAnagrafici.cognome,
      },
    );

  arr.push(
    {
      cd_attributo: codiciAttributo.CD_SESSO_UTENTE,
      cd_val_attributo: values.datiAnagrafici.sesso ?
        values.datiAnagrafici.sesso : -1,
    },
  );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_LUOGO_DI_NASCITA_UTENTE,
        cd_val_attributo: values.datiAnagrafici.luogoNascita && values.datiAnagrafici.luogoNascita.length ? 1 : -1,
        tx_val: values.datiAnagrafici.luogoNascita,
      },
    );

  arr.push(
    {
      cd_attributo: codiciAttributo.CD_STATO_DI_NASCITA_UTENTE,
      cd_val_attributo: values.datiAnagrafici.statoNascita ?
        values.datiAnagrafici.statoNascita : -1,
    },
  );

    arr.push(
      {
        cd_attributo: codiciAttributo.DT_NASCITA_UTENTE,
        cd_val_attributo: values.datiAnagrafici.dataNascita
          && moment(values.datiAnagrafici.dataNascita, 'DD/MM/YYYY').isValid() ? 1 : -1,
        dt_val: moment(values.datiAnagrafici.dataNascita, 'DD/MM/YYYY').isValid() ?
          moment(values.datiAnagrafici.dataNascita, 'DD/MM/YYYY').format('YYYY-MM-DD')
          : null,
      },
    );

  arr.push(
    {
      cd_attributo: codiciAttributo.CD_CITTADINANZA_UTENTE,
      cd_val_attributo: values.datiAnagrafici.cittadinanza ? values.datiAnagrafici.cittadinanza : -1,
    },
  );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_CODICE_FISCALE,
        cd_val_attributo: values.datiAnagrafici.codiceFiscale && values.datiAnagrafici.codiceFiscale.length ? 1 : -1,
        tx_val: values.datiAnagrafici.codiceFiscale,
      },
    );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_NR_CARTA_DI_IDENTITA,
        cd_val_attributo: values.cartaIdentita.numero && values.cartaIdentita.numero.length && values.cartaIdentita.checkCarta === 1 ? 1 : -1 ,
        tx_val: values.cartaIdentita.numero,
      },
    );
  
    arr.push(
      {
        cd_attributo: codiciAttributo.DT_RILASCIO_CARTA_DI_IDENTITA,
        cd_val_attributo: values.cartaIdentita.dataRilascio
          && moment(values.cartaIdentita.dataRilascio, 'DD/MM/YYYY').isValid() && values.cartaIdentita.checkCarta === 1 ? 1 : -1,
        dt_val: moment(values.cartaIdentita.dataRilascio, 'DD/MM/YYYY').isValid() ?
          moment(values.cartaIdentita.dataRilascio, 'DD/MM/YYYY').format('YYYY-MM-DD')
          : null,
      },
    );
  
    arr.push(
      {
        cd_attributo: codiciAttributo.DT_SCADENZA_CARTA_DI_IDENTITA,
        cd_val_attributo: values.cartaIdentita.dataScadenza
          && moment(values.cartaIdentita.dataScadenza, 'DD/MM/YYYY').isValid() && values.cartaIdentita.checkCarta === 1 ? 1 : -1,
        dt_val: moment(values.cartaIdentita.dataScadenza, 'DD/MM/YYYY').isValid() ?
          moment(values.cartaIdentita.dataScadenza, 'DD/MM/YYYY').format('YYYY-MM-DD')
          : null,
      },
    );
  
    arr.push(
      {
        cd_attributo: codiciAttributo.TX_COMUNE_DI_RILASCIO_CARTA_DI_IDENTITA,
        cd_val_attributo: values.cartaIdentita.rilasciatoDa && values.cartaIdentita.rilasciatoDa.length && values.cartaIdentita.checkCarta === 1 ? 1 : -1,
        tx_val: values.cartaIdentita.rilasciatoDa,
      },
    );

  arr.push(
    {
      cd_attributo: codiciAttributo.TX_NR_PASSAPORTO,
      cd_val_attributo: !isNullOrUndefined(values.passaporto.numero) && values.passaporto.checkPassaporto === 1 ? 1 : -1,
      tx_val: values.passaporto.numero,
    },
    {
      cd_attributo: codiciAttributo.DT_DATA_RILASCIO_PASSAPORTO,
      cd_val_attributo: values.passaporto.checkPassaporto === 1 ? 1 : -1,
      dt_val: moment(values.passaporto.dataRilascio, 'DD/MM/YYYY').isValid() &&
        values.passaporto.checkPassaporto === 1 ?
        moment(values.passaporto.dataRilascio, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null,
    },
    {
      cd_attributo: codiciAttributo.DT_DATA_SCADENZ_PASSAPORTO,
      cd_val_attributo: values.passaporto.checkPassaporto === 1 ? 1 : -1,
      dt_val: moment(values.passaporto.dataScadenza, 'DD/MM/YYYY').isValid() &&
        values.passaporto.checkPassaporto === 1 ?
        moment(values.passaporto.dataScadenza, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null,
    },
    {
      cd_attributo: codiciAttributo.TX_ENTE_RILASCIO_PASSAPORTO,
      cd_val_attributo: !isNullOrUndefined(values.passaporto.rilasciatoDa) && values.passaporto.checkPassaporto === 1 ? 1 : -1,
      tx_val: values.passaporto.rilasciatoDa,
    },
  );

  arr.push(
    {
      cd_attributo: codiciAttributo.TX_MOTIVO_PS,
      cd_val_attributo: !isNullOrUndefined(values.permessoSoggiorno.motivo) && values.permessoSoggiorno.checkPermessoSoggiorno === 1 ? 1 : -1,
      tx_val: values.permessoSoggiorno.motivo,
    },
    {
      cd_attributo: codiciAttributo.TX_NR_PS,
      cd_val_attributo: !isNullOrUndefined(values.permessoSoggiorno.numero) && values.permessoSoggiorno.checkPermessoSoggiorno === 1 ? 1 : -1,
      tx_val: values.permessoSoggiorno.checkPermessoSoggiorno === 1 ? values.permessoSoggiorno.numero : '',
    },
    {
      cd_attributo: codiciAttributo.TX_DATA_RILASCIO_PS,
      cd_val_attributo: values.permessoSoggiorno.checkPermessoSoggiorno === 1 ? 1 : -1,
      dt_val: moment(values.permessoSoggiorno.dataRilascio, 'DD/MM/YYYY').isValid() &&
        values.permessoSoggiorno.checkPermessoSoggiorno === 1 ?
        moment(values.permessoSoggiorno.dataRilascio, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null,
    },
    {
      cd_attributo: codiciAttributo.TX_DATA_SCADENZA_PS,
      cd_val_attributo: values.permessoSoggiorno.checkPermessoSoggiorno === 1 ? 1 : -1,
      dt_val: moment(values.permessoSoggiorno.dataScadenza, 'DD/MM/YYYY').isValid() &&
        values.permessoSoggiorno.checkPermessoSoggiorno === 1 ?
        moment(values.permessoSoggiorno.dataScadenza, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null,
    },
    {
      cd_attributo: codiciAttributo.TX_QUESTURA_RILASCIO_PS,
      cd_val_attributo: !isNullOrUndefined(values.permessoSoggiorno.rilasciatoDa) && values.permessoSoggiorno.checkPermessoSoggiorno === 1 ? 1 : -1,
      tx_val: values.permessoSoggiorno.rilasciatoDa,
    },
    {
      cd_attributo: codiciAttributo.DT_DATA_RICHIESTA_RINNOVO_PS,
      cd_val_attributo: !isNullOrUndefined(values.permessoSoggiorno.dataRichiestaRinnovo) && values.permessoSoggiorno.checkPermessoSoggiorno === 1 && values.permessoSoggiorno.checkRichiestaRinnovo ? 1 : -1,
      dt_val:  moment(values.permessoSoggiorno.dataRichiestaRinnovo, 'DD/MM/YYYY').isValid() &&
      values.permessoSoggiorno.checkPermessoSoggiorno === 1 && values.permessoSoggiorno.checkRichiestaRinnovo ?
      moment(values.permessoSoggiorno.dataRichiestaRinnovo, 'DD/MM/YYYY').format('YYYY-MM-DD')
      : null,
    },
  );
  
    arr.push(
      {
        cd_attributo: codiciAttributo.TX_INDIRIZZO_DOMICILIO,
        cd_val_attributo: values.domicilio.indirizzo && values.domicilio.indirizzo.length ? 1 : -1,
        tx_val: values.domicilio.indirizzo,
      },
    );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_COMUNE_DOMICILIO,
        cd_val_attributo: values.domicilio.comune && values.domicilio.comune.length ? 1 : -1,
        tx_val: values.domicilio.comune,
      },
    );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_INDIRIZZO_RESIDENZA,
        cd_val_attributo: values.residenza.indirizzo && values.residenza.indirizzo.length ? 1 : -1,
        tx_val: values.residenza.indirizzo,
      },
    );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_COMUNE_RESIDENZA,
        cd_val_attributo: values.residenza.comune && values.residenza.comune.length ? 1 : -1,
        tx_val: values.residenza.comune,
      },
    );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_RECAPITO_TELEFONICO,
        cd_val_attributo: values.contatti.telefono1 && values.contatti.telefono1.length ? 1 : -1,
        tx_val: values.contatti.telefono1,
      },
    );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_RECAPITO_TELEFONICO_2,
        cd_val_attributo: values.contatti.telefono2 && values.contatti.telefono2.length ? 1 : -1,
        tx_val: values.contatti.telefono2,
      },
    );

    arr.push(
      {
        cd_attributo: codiciAttributo.TX_EMAIL,
        cd_val_attributo: values.contatti.email && values.contatti.email.length ? 1 : -1,
        tx_val: values.contatti.email,
      },
    );
  return arr;
}

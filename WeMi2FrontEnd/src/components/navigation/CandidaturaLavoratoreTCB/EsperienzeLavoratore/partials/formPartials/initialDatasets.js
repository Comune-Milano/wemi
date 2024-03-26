
import { codiciAttributo } from 'components/navigation/CandidaturaLavoratoreTCB/constants/CodiciAttributo';
import moment from 'moment';

export const getArrayFamiglie = (dbData) => {
  let arr = [];

  if (dbData) {
    arr = dbData.map((el, index) => {
      let nome = '';
      const { idRichiesta } = el;
      const serviziPrestati = el.serviziPrestati || [];
      const inizioPeriodo = el.inizioPeriodo ? moment(el.inizioPeriodo).toDate() : undefined;
      const { finePeriodo } = el;
      let sedeLavoroComune = '';
      let sedeLavoroProvincia = '';
      let emailFamiglia = '';
      let telefonoFamiglia = '';
      const inCorsoFlag = moment(moment(finePeriodo).format('YYYY-MM-DD')).isSame('9999-12-31');

      el.attributi.forEach(att => {
        switch (att.cd_attributo) {
          case codiciAttributo.TX_COGNOME_CONTATTO:
            nome = att.tx_val;
            break;
          case codiciAttributo.TX_COMUNE_SEDE_DI_LAVORO:
            sedeLavoroComune = att.tx_val;
            break;
          case codiciAttributo.TX_PROVINCIA_SEDE_DI_LAVORO:
            sedeLavoroProvincia = att.tx_val;
            break;
          case codiciAttributo.TX_EMAIL_CONTATTO:
            emailFamiglia = att.tx_val;
            break;
          case codiciAttributo.TX_TELEFONO_CONTATTO:
            telefonoFamiglia = att.tx_val;
            break;
          default:
            break;
        }
      });

      return {
        id: idRichiesta,
        nome,
        new: false,
        order: index + 1,
        serviziPrestati,
        inCorsoFlag: moment(moment(finePeriodo).format('YYYY-MM-DD')).isSame('9999-12-31'),
        inizioPeriodo,
        finePeriodo: !inCorsoFlag && el.finePeriodo ? moment(el.finePeriodo).toDate() : undefined,
        sedeLavoroComune,
        sedeLavoroProvincia,
        emailFamiglia,
        telefonoFamiglia,
        descrizioneEsp: el.descrizioneEsp,
        nomeServizioAltro: el.nomeServizioAltro,
        type: el.type,
      };
    });
  }
  return arr;
};

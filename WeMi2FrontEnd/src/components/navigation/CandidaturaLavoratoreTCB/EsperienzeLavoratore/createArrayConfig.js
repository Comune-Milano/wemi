
import { codiciAttributo } from '../constants/CodiciAttributo';

export const createArrayConfig = (values, nomeFamiglia, touched) => {
  const arr = [];

  arr.push(
    {
      cd_attributo: codiciAttributo.TX_COGNOME_CONTATTO,
      cd_val_attributo: 1,
      tx_val: nomeFamiglia,
    },
    {
      cd_attributo: codiciAttributo.TX_PROVINCIA_SEDE_DI_LAVORO,
      cd_val_attributo: 1,
      tx_val: values.sedeLavoroProvincia,
    },
    {
      cd_attributo: codiciAttributo.TX_COMUNE_SEDE_DI_LAVORO,
      cd_val_attributo: 1,
      tx_val: values.sedeLavoroComune,
    },
    {
      cd_attributo: codiciAttributo.TX_EMAIL_CONTATTO,
      cd_val_attributo: 1,
      tx_val: values.emailFamiglia,
    },
    {
      cd_attributo: codiciAttributo.TX_TELEFONO_CONTATTO,
      cd_val_attributo: 1,
      tx_val: values.telefonoFamiglia,
    },
  );

  return arr;
};

import { cdAttributo } from '../../../navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';

export const inizializzaCheckboxValue = (Estrailista, locale) => {
  let countBabySitter = 0;
  let countBadante = 0;
  let countColf = 0;
  const arr = [];
  const isChecked = 1;

  const returnServizio = (cdAttr) => {
    if (cdAttr === cdAttributo.LS_MANSIONI_RICHIESTE_BADANTE) {
      return 'badante';
    }
    if (cdAttr === cdAttributo.LS_MANSIONI_RICHIESTE_COLF) {
      return 'colf';
    }
    if (cdAttr === cdAttributo.LS_MANSIONI_RICHIESTE_TATA) {
      return 'baby-sitter';
    }
  };

  Estrailista.forEach((elemento) => {
    const value = elemento.tl_valore_testuale[locale];

    if (elemento.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_TATA && elemento.cd_dominio_tcb !== 0) {
      arr.push(
        {
          value,
          checked: elemento.fg_mansione_svolta === isChecked,
          cd_val_attributo: elemento.cd_val_attributo,
          cd_attributo: elemento.cd_attributo,
          nota: elemento.tx_nota,
          cdDominioTcb: elemento.cd_dominio_tcb,
        }
);
    }

    if (elemento.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_COLF && elemento.cd_dominio_tcb !== 0) {
      arr.push(
        {
          value,
          checked: elemento.fg_mansione_svolta === isChecked,
          cd_val_attributo: elemento.cd_val_attributo,
          cd_attributo: elemento.cd_attributo,
          nota: elemento.tx_nota,
          cdDominioTcb: elemento.cd_dominio_tcb,
        }
);
    }
    if (elemento.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_BADANTE && elemento.cd_dominio_tcb !== 0) {
      arr.push(
        {
          value,
          checked: elemento.fg_mansione_svolta === isChecked,
          cd_val_attributo: elemento.cd_val_attributo,
          cd_attributo: elemento.cd_attributo,
          nota: elemento.tx_nota,
          cdDominioTcb: elemento.cd_dominio_tcb,
        }
);
    }
  });
  Estrailista.map((ele) => {
    if (ele.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_TATA) {
      countBabySitter += 1;
    }
    if (ele.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_COLF) {
      countColf += 1;
    }
    if (ele.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_BADANTE) {
      countBadante += 1;
    }
  });


  Estrailista.map((elemento) => {
    let value = elemento.tl_valore_testuale[locale];
    if (elemento.cd_dominio_tcb === 0) {
            /**
             * Al dominio = 0 corrisponde altro e bisogna differenziarlo per cd_attributo
             * 62 altro tata
             * 61 altro colf
             * 60 altro badante
             */
      switch (elemento.cd_attributo) {
        case cdAttributo.LS_MANSIONI_RICHIESTE_TATA:
          value = `Baby-sitter - ${value}`;
          break;
        case cdAttributo.LS_MANSIONI_RICHIESTE_COLF:
          value = `Colf - ${value}`;
          break;
        case cdAttributo.LS_MANSIONI_RICHIESTE_BADANTE:
          value = `Badante - ${value}`;
          break;
        default:
          break;
      }
    }
    if (elemento.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_TATA && elemento.cd_dominio_tcb === 0) {
      arr.splice(((countBabySitter + countColf) - 1), 0, {
        value,
        checked: elemento.fg_mansione_svolta === isChecked,
        cd_val_attributo: elemento.cd_val_attributo,
        cd_attributo: elemento.cd_attributo,
        nota: elemento.tx_nota,
        cdDominioTcb: elemento.cd_dominio_tcb,
      });
    }
    if (elemento.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_COLF && elemento.cd_dominio_tcb === 0) {
      arr.splice(((countColf + countBadante) - 1), 0, {
        value,
        checked: elemento.fg_mansione_svolta === isChecked,
        cd_val_attributo: elemento.cd_val_attributo,
        cd_attributo: elemento.cd_attributo,
        nota: elemento.tx_nota,
        cdDominioTcb: elemento.cd_dominio_tcb,
      });
    }
    if (elemento.cd_attributo === cdAttributo.LS_MANSIONI_RICHIESTE_BADANTE && elemento.cd_dominio_tcb === 0) {
      arr.splice((countBadante - isChecked), 0, {
        value,
        checked: elemento.fg_mansione_svolta === isChecked,
        cd_val_attributo: elemento.cd_val_attributo,
        cd_attributo: elemento.cd_attributo,
        nota: elemento.tx_nota,
        cdDominioTcb: elemento.cd_dominio_tcb,
      });
    }
  });

  let count = 1;

  arr.map((elemento, index) => {
    const cd = arr[0].cd_attributo;
    if (elemento.cd_attributo !== cd && elemento.cd_attributo !== arr[index - 1].cd_attributo) {
      count = 2;
      arr[0].testo = `Mansioni svolte come ${returnServizio(arr[0].cd_attributo)}`;
      elemento.testo = `Mansioni svolte come ${returnServizio(elemento.cd_attributo)}`;
      arr.push({ count });
    }
  });


  return arr;
};

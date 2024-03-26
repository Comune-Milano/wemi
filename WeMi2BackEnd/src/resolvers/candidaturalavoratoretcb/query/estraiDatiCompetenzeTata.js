import {
  estraiDatiCompetenzeTataQuery
} from '../queries/queries';


export const estraiDatiCompetenzeTata = async (parent, args, context, info) => {
  let altreMansioniTata, altroFlag, terapieSpecificate, terapieFlag, altreMansioniColf;

  const { idUtenteLav } = args;
  const [[flag], datiComp] = await context.db.multi(estraiDatiCompetenzeTataQuery, { idUtenteLav });
  
  const mansioniColfArr = datiComp.filter(el => {
    if (el.cd_attributo === '158' && el.cd_val_attributo === '0') {
      altreMansioniColf = el.tx_val;
    }
    return el.cd_attributo === '158';
  });
  const faccendeDomesticheFlag = datiComp.find(el => el.cd_attributo === '127');

  const mansioniTataArr = () => {
    let fasceMansioniTata = [];
    let mansioniTata = datiComp.slice().filter((el) => {
      if (el.cd_attributo === '117') {
        /** Qui scrivo semplicemente le variabili che mi interessavano
         * e poi mi faccio restituire solo il cd_Attributo mansioniTata
         */
        if (el.cd_val_attributo === '0') {
          altroFlag = true;
          altreMansioniTata = el.tx_val;
        };
        if (el.cd_val_attributo === '14') {
          terapieFlag = true;
          terapieSpecificate = el.tx_val;
        };
        return el;
      }
    });

    let mansioniTataDistinct = mansioniTata
      .map(el => el.cd_val_attributo)
      .filter((value, index, self) => self.indexOf(value) === index);

    for (let j = 0; j < mansioniTataDistinct.length; j += 1) {
      let fasceMansTataTemp = {
        idMans: undefined,
        fasceEtaSelezionate: [],
      };
      let arr2 = [];
      fasceMansTataTemp['idMans'] = parseInt(mansioniTataDistinct[j], 10);
      if (mansioniTataDistinct[j] !== '12' && mansioniTataDistinct[j] !== '13') {
        arr2 = mansioniTata.slice();
        arr2 = arr2.filter(r => parseInt(r.cd_val_attributo, 10) === fasceMansTataTemp['idMans']);
        fasceMansTataTemp['fasceEtaSelezionate'] = arr2.map(el => parseInt(el.cd_val_attributo_2, 10));
      }
      fasceMansioniTata.push(fasceMansTataTemp);
    };

    return fasceMansioniTata;
  };

  const mansioniTata = mansioniTataArr();

  return {
    flagCandidatura: flag.value,
    mansioniColf: mansioniColfArr.length ? mansioniColfArr.map(el => el.cd_val_attributo) : [],
    altreMansioniColf: altreMansioniColf,
    faccendeDomestiche: faccendeDomesticheFlag ? faccendeDomesticheFlag.fg_val === '1' ? 1 : 2 : undefined,
    mansioniTata: mansioniTata,
    terapieFlag: terapieFlag,
    terapieSpecificate: terapieSpecificate,
    altroFlag: altroFlag,
    altreMansioniTata: altreMansioniTata
  }
}


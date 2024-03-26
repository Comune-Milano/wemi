import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { functionSort } from 'utils/functions/functionSort';
import Wrapper from '../partials/Wrapper';
import SectionTitle from '../partials/SectionTitle';
import FieldText from '../partials/FieldText';
import FieldList from '../partials/FieldList';
import FieldCheck from '../partials/FieldCheck';

const Mansioni = ({
  title,
  moveTo,
  servizioTCB,
  locale,
  loading,
  errored,
  data,
  dataBeneficiari,
  dataPatologie,
}) => {
  const mansioniBenArray = [];
  const altroApp = [];
  let flagVacanzeFamiglia = false;
  let flagVacanzeBambini = false;
  let flagVacanzeBadanteFamiglia = false;
  let flagVacanzeBadanteAssistito = false;
  let altro = {};
  const idAltro = 0;
  const patologieSpeciali = {};
  // TATA
  if (servizioTCB.cd_dominio_tcb === 1 && !loading && data) {
    dataBeneficiari && dataBeneficiari.beneficiari && dataBeneficiari.beneficiari.map((infoBen) => {
      mansioniBenArray.push({
        code: getObjectValue(infoBen, 'pgBen', null),
        label: getObjectValue(infoBen, 'nomeBen.txVal', ''),
        array: [],
      });
    });
    data.mansioni.map((mans) => {
      const cdAttr = getObjectValue(mans, 'cdDominioTcb', null);
      const arrayBen = getObjectValue(mans, 'arrayBen', []);
      arrayBen.forEach(benCode => {
        let output = null;
        const targetBen = mansioniBenArray.find((ben) => ben.code === benCode);

        // 0 = Altro
        if (cdAttr === idAltro) {
          altroApp.push({ targetBen, value: getObjectValue(mans, 'txNota', '') });
        } else if (cdAttr === 11) {
          const pat = dataPatologie.find((el) => el.pgBen === benCode);
          output = { value: getObjectValue(mans, `txTitoloMansione.${locale}`, null) };

          // 12 e 13 = Vacanze | (gestiti a parte per tutti)
        } else if (cdAttr !== 12 && cdAttr != 13) {
          output = { value: getObjectValue(mans, `txTitoloMansione.${locale}`, null) };
        }
        if (output && targetBen && targetBen.array !== undefined) { targetBen.array.push(output); }
      });
      if (cdAttr === 12) {
        flagVacanzeBambini = true;
      }
      if (cdAttr === 13) {
        flagVacanzeFamiglia = true;
      }
    });
    // Patologie speciali
    dataPatologie.forEach((pat) => {
      mansioniBenArray.forEach(ele => {
        if (ele.code === pat.pgBen) {
          ele.array.push({
            other: true,
            label: 'Assistenza di bambino/a con disabilità o bisogni educativi speciali',
            value: getObjectValue(pat, 'txVal', ''),
            cdDominioTcb: 0,
          });
        }
      });
    });
  }

  // BADANTE
  if (servizioTCB.cd_dominio_tcb === 3 && !loading && data) {
    mansioniBenArray.push({
      code: '0',
      label: 'Mansioni richieste',
      array: [],
    });
    data.mansioni.map((mans) => {
      const cdAttr = getObjectValue(mans, 'cdDominioTcb', null);
      let output = null;

      // 0 = Altro
      if (cdAttr === idAltro) {
        altro = { other: true, value: getObjectValue(mans, 'txNota', null), error: !getObjectValue(mans, 'txNota', false), label: 'Altro', cdDominioTcb: cdAttr };

        // 21 e 22 = Vacanze | (gestite a parte)
      } else if (cdAttr === 3) {
        // 3 è Somministrazione di terapie ed ha delle note
        output = { other: true, value: getObjectValue(mans, 'txNota', ''), label: 'Somministrazione di terapie', cdDominioTcb: cdAttr };
      } else if (cdAttr !== 21 && cdAttr != 22) {
        output = { value: getObjectValue(mans, `txTitoloMansione.${locale}`, null) };
      }

      if (cdAttr === 21) {
        if (servizioTCB.cd_dominio_tcb === 3) {
          // per badante va nella lista con le altre mansioni
          output = { value: 'Accompagnamento in vacanza solo con assistito' };
        } else {
          flagVacanzeBadanteAssistito = true;
        }
      }
      if (cdAttr === 22) {
        if (servizioTCB.cd_dominio_tcb === 3) {
          // per badante va nella lista con le altre mansioni
          output = { value: 'Accompagnamento in vacanza con altri familiari' };
        } else {
          flagVacanzeBadanteFamiglia = true;
        }
      }

      if (output && mansioniBenArray && mansioniBenArray[0].array !== undefined) { mansioniBenArray[0].array.push(output); }
    });

    // Patologie speciali
    dataPatologie.forEach((pat) => {
      let output = {};
      const targetBen = dataBeneficiari && dataBeneficiari.beneficiari && dataBeneficiari.beneficiari.find((ben) => ben.pgBen === pat.pgBen);
      output = { other: true, value: getObjectValue(pat, 'txVal', ''), label: ("Assistenza speciale per " + getObjectValue(targetBen, 'nomeBen.txVal', null)) };
      if (mansioniBenArray && mansioniBenArray[0].array !== undefined) { mansioniBenArray[0].array.push(output); }
    });
  }
  if (altroApp.length) {
    const nomi = [];
    altroApp.forEach(ele => {
      if (ele.targetBen) {
        nomi.push(ele.targetBen.label);
      }
    });
    if (nomi.length) {
      altro = { other: true, value: altroApp[0].value, label: `Altro per ${nomi.join(',')}`, cdDominioTcb: 0 };
    }
  }

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
        {mansioniBenArray && mansioniBenArray.map((ben, i) => (
          <FieldList
            key={`ben_${ben.code}`}
            title={ben.label}
            array={functionSort(ben.array, 'cdDominioTcb')}
            required={!altro.value}
          />
        ))}
        {servizioTCB.cd_dominio_tcb === 1 && (
          <>
            <FieldCheck
              title="Vacanze con i bambini"
              checked={flagVacanzeBambini}
            />
            <FieldCheck
              title="Vacanze con la famiglia"
              checked={flagVacanzeFamiglia}
            />
          </>
        )}
        {
          altro.cdDominioTcb === idAltro ?
            <FieldText
              title={altro.label}
              value={altro.value}
              required
            />
            : null
        }
      </Wrapper>
    </>
  );
};
Mansioni.displayName = 'Mansioni';

export default Mansioni;
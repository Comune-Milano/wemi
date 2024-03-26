import React from 'react';
import * as yup from 'yup';

import AggiuntaPersone from './AggiuntaPersone';
import Elenco from './Elenco';

const ListinoPrezzi = ({
  listino,
  setListino,
  isFree,
  disabled,
}) => {
  const schema = yup.array().of(
    yup.object().shape({
      offerta: yup.array().of(
        yup.object().shape({
          qtUnitaA: yup.number().integer().nullable(true)
          .when('qtUnitaDa', (qtUnitaDa, schema) => (
            qtUnitaDa ?
            schema.min(qtUnitaDa, 'Il valore non può essere minore del numero di unità da')
            :
            schema.min(1, 'Il valore deve essere superiore a 0')
          )),
          qtUnitaDa: yup
            .number()
            .transform(value => (isNaN(value) ? undefined : value))
            .required('Campo obbligatorio')
            .integer()
            .min(1, 'Il valore deve essere superiore a 0'),
          valore: yup
            .number()
            .transform(value => (isNaN(value) ? undefined : value))
            .required('Campo obbligatorio')
            .min(isFree ? 0 : 0.01, 'Il valore deve essere superiore a 0'),
        })
      )
      .test(
        'noCrossQuantita',
        null,
        offerta => {
          for (let i = 0; i < offerta.length; i += 1) {
            const objToCheck = offerta[i];
            for (let j = i + 1; j < offerta.length; j += 1) {
              const obj = offerta[j];
              if (objToCheck.qtUnitaDa <= (obj.qtUnitaA || Number.POSITIVE_INFINITY)
                && obj.qtUnitaDa <= (objToCheck.qtUnitaA || Number.POSITIVE_INFINITY)) {
                return new yup.ValidationError(
                  "L'intervallo si sovrappone a uno esistente",
                  null,
                  'checkCrossQuantita'
                );
              }
            }
          }
          return true;
        }
      ),
      qtPersoneA: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required('Campo obbligatorio')
        .integer()
        .when('qtPersoneDa', (qtPersoneDa, schema) => (
          typeof qtPersoneDa === 'number' && qtPersoneDa > 0 ?
          schema.min(qtPersoneDa, 'Il valore non può essere minore del numero di persone da'
          )
          :
          schema
        )),
      qtPersoneDa: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required('Campo obbligatorio')
        .integer().min(1, 'Il valore deve essere superiore a 0'),
    })
  )
  .test(
    'noCrossPersone',
    null,
    array => {
      for (let i = 0; i < array.length; i += 1) {
        const objToCheck = array[i];
        for (let j = i + 1; j < array.length; j += 1) {
          const obj = array[j];
          if (
              (objToCheck.qtPersoneDa <= obj.qtPersoneA && obj.qtPersoneDa <= objToCheck.qtPersoneA)
              ||
              (objToCheck.qtPersoneDa === 1 && obj.qtPersoneA === 1 && 
                obj.qtPersoneDa === 1 && objToCheck.qtPersoneA === 1)
            ) {
            return new yup.ValidationError(
              "L'intervallo si sovrappone a uno esistente",
              null,
              'checkCrossPersone'
            );
          }
        }
      }
      return true;
    }
  );
  const addPersonInterval = (qtPersoneDa, qtPersoneA) => {
    const newListino = [...listino, {
      qtPersoneA,
      qtPersoneDa,
      offerta: [],
    }];
    setListino(newListino);
  };

  const updateInterval = riga => {
    const index = listino.findIndex(el =>
      el.qtPersoneA === riga.qtPersoneA && el.qtPersoneDa === riga.qtPersoneDa
    );
    const newListino = [...listino];
    newListino.splice(index, 1, riga);
    setListino(newListino);
  };

  const checkQuantityValidity = riga => {
    const index = listino.findIndex(el =>
      el.qtPersoneA === riga.qtPersoneA && el.qtPersoneDa === riga.qtPersoneDa
    );
    const newListino = [...listino];
    newListino.splice(index, 1, riga);
    return validateSchema(newListino);
  };

  const remove = (riga) => {
    const index = listino.findIndex(el => (
      el.qtPersoneA === riga.qtPersoneA && el.qtPersoneDa === riga.qtPersoneDa
    ));
    const newListino = [...listino];
    newListino.splice(index, 1);
    setListino(newListino);
  };

  const validateSchema = (listinoPrezzi) => {
    try {
      schema.validateSync(listinoPrezzi, { abortEarly: false });
    } catch (err) {
      return err.inner.reduce((acc, errore) => {
        const path = errore.path.split('.');
        return {
          ...acc,
          [path[path.length - 1]]: errore.message,
        };
      }, {});
    }
    return {};
  };

  const checkPersonValidity = (qtPersoneDa, qtPersoneA) => {
    const err = validateSchema([
      ...listino,
      {
        qtPersoneA,
        qtPersoneDa,
        offerta: [],
      },
    ]);
    return err;
  };

  return (
    <>
      {
        !disabled ?
        (
          <AggiuntaPersone
            isValid={checkPersonValidity}
            save={addPersonInterval}
          />
        )
        : null
      }
      <Elenco
        listinoPrezzi={listino}
        updateListino={updateInterval}
        isValid={checkQuantityValidity}
        remove={remove}
        isFree={isFree}
        disabled={disabled}
      />
    </>
  );
};

ListinoPrezzi.displayName = 'Listino prezzi';

export default React.memo(ListinoPrezzi);

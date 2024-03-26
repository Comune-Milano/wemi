import React from 'react';

import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import { Row, Column } from 'components/ui/Grid'
import Text from 'components/ui/Text';

import { BorderedRow, BorderedColumn, SubBorderedRow } from './Elenco.styled';
import AggiungiQuantita from './AggiungiQuantita';


const Elenco = ({
  listinoPrezzi,
  remove,
  updateListino,
  isValid,
  isFree,
  disabled,
}) => {
  return listinoPrezzi
  .sort((a, b) => (a.qtPersoneDa - b.qtPersoneDa))
  .map(riga => {
    const add = (offerta) => {
      const newRiga = {
        ...riga,
        offerta: [...riga.offerta, offerta],
      };
      updateListino(newRiga);
    };

    const rimuovi = (offerta) => {
      const index = riga.offerta.findIndex(el => (
        el.qtUnitaDa === offerta.qtUnitaDa && el.qtUnitaA === offerta.qtUnitaA
      ));
      const newOfferta = [...riga.offerta];
      newOfferta.splice(index,1);
      const newRiga = {
        ...riga,
        offerta: newOfferta,
      };
      updateListino(newRiga);
    };

    const check = (qtUnitaDa, qtUnitaA, valore) => (
      isValid({
        ...riga,
        offerta: [
          ...riga.offerta,
          {
            qtUnitaA,
            qtUnitaDa,
            valore,
          },
        ],
      })
    );

    return (
      <BorderedRow
        key={`${riga.qtPersoneDa}-${riga.qtPersoneA}`}
      >
        <Column xs="12" md="5">
          <Row>
            <Column xs="9">    
              <Text
                value="Persone da "
                size="f5"
                color="darkGrey"
              />
              <Text
                value={riga.qtPersoneDa}
                size="f5"
                color="darkGrey"
                weight="bold"
              />
              <Text
                value=" a "
                size="f5"
                color="darkGrey"
              />
              <Text
                value={riga.qtPersoneA}
                size="f5"
                color="darkGrey"
                weight="bold"
              />
            </Column>
            <Column xs="3">
              {
                !disabled ?
                (
                  <ButtonIcon
                    icon="minus"
                    color="red"
                    size="f6"
                    onClick={() => { remove(riga); }}
                  />
                )
                : null
              }
            </Column>
          </Row>
        </Column>
        <BorderedColumn xs="12" md="7" padding="0 1em">
          {
            !disabled ?
            (
              <SubBorderedRow>
                <AggiungiQuantita
                  isValid={check}
                  save={add}
                  isFree={isFree}
                />
              </SubBorderedRow>
            )
            : null
          }
          <SubBorderedRow>
            <Column xs="3" padding="0.2em 1em" flex justifycontent="flex-end">
              <Text
                value="Unità da"
                size="f6"
                color="blue"
                weight="bold"
              />
            </Column>
            <Column xs="3" padding="0.2em 1em" flex justifycontent="flex-end">
              <Text
                value="Unità a"
                size="f6"
                color="blue"
                weight="bold"
              />
            </Column>
            {
              !isFree ?
              (
                <Column xs="3" padding="0.2em 1em" flex justifycontent="flex-end">
                  <Text
                    value="Importo"
                    size="f6"
                    color="blue"
                    weight="bold"
                  />
                </Column>
              )
              : null
            }
          </SubBorderedRow>
          {
            riga.offerta
            .sort((a, b) => (a.qtUnitaDa - b.qtUnitaDa))
            .map(offerta => (
              <SubBorderedRow key={`${offerta.qtUnitaDa}-${offerta.qtUnitaA}`}>
                <Column xs="3" padding="0.2em 1em" flex justifycontent="flex-end">
                  <Text
                    value={offerta.qtUnitaDa}
                    size="f6"
                    color="darkGrey"
                    weight="bold"
                  />
                </Column>
                <Column xs="3" padding="0.2em 1em" flex justifycontent="flex-end">
                  <Text
                    value={!offerta.qtUnitaA ?
                      'Intervallo aperto'
                      :
                      offerta.qtUnitaA
                    }
                    size="f6"
                    color="darkGrey"
                    weight="bold"
                    align="end"
                  />
                </Column>
                {
                  !isFree ?
                  (
                    <Column xs="3" padding="0.2em 1em" flex justifycontent="flex-end">
                      <Text
                        value={offerta.valore}
                        size="f6"
                        color="darkGrey"
                        weight="bold"
                      />
                    </Column>
                  )
                  : null
                }
                {
                  !disabled ?
                  (
                    <Column xs="3" padding="0.2em 1em">
                      <ButtonIcon
                        icon="minus"
                        color="red"
                        fontSize="f7"
                        onClick={() => { rimuovi(offerta); }}
                      />
                    </Column>
                  )
                  : null
                }
              </SubBorderedRow>
            ))
          }
        </BorderedColumn>
      </BorderedRow>
    );
  });
};

Elenco.displayName = 'Elenco persone';

export default Elenco;

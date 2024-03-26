/** @format */

import React from 'react';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import TextArea from 'components/ui2/TextArea';
import Checkbox from 'components/ui2/Checkbox';
import ColumnsContainer from 'components/ui2/ColumnsContainer';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const TipoSistemazione = ({ nomeTipoOrario }) => {
  const { dataset, setFormField, handleFieldBlur, errors, touched } = useFormContext();

  const spazioId = `${nomeTipoOrario}SpaziAccettabili`;
  const testoAltroSpazioId = `${nomeTipoOrario}TestoSpazioAccettabileAltro`;
  const altroSpazio = dataset[spazioId].find(el => el.id === 0);

  return (
    <Row fluid margin="1em 0">
      <GroupFieldTitle
        marginTop="0"
        title="Quale tipo di sistemazione sei disponibile ad accettare?"
      />
      <Row fluid>
        <ColumnsContainer xsCount={1} mdCount={2} width="100%">
          {dataset[spazioId].filter(el => el.id !== 0).map((tipoSpazio, index) => {
            return (
              <Column key={tipoSpazio.id.toString()} xs="12" padding="0">
                <Row fluid>
                  <Checkbox
                    fontSize="f7"
                    width="fit-content"
                    checkcolor="primary"
                    label={tipoSpazio.value}
                    value={tipoSpazio.checked}
                    onChange={isChecked => {
                      const dataCopy = dataset[spazioId].map(el => ({ ...el }));
                      const selectedCheckbox = dataCopy.find(el => el.id === tipoSpazio.id);
                      selectedCheckbox.checked = isChecked;
                      setFormField(spazioId, dataCopy);
                    }}
                  />
                </Row>
              </Column>
            );
          })}
        </ColumnsContainer>
        {altroSpazio ?
          (
            <Row fluid margin="1em 0 0 0">
              <Checkbox
                fontSize="f7"
                width="fit-content"
                checkcolor="primary"
                label={altroSpazio.value}
                value={altroSpazio.checked}
                onChange={isChecked => {
                  const dataCopy = dataset[spazioId].map(el => ({ ...el }));

                  const selectedCheckbox = dataCopy.find(el => el.id === 0);
                  selectedCheckbox.checked = isChecked;
                  setFormField([spazioId], dataCopy);
                }}
              />
            </Row>
          )
          : null}
        {altroSpazio.checked ? (
          <Row fluid margin="0">
            <Column xs="12" md="11" padding="0">
              <TextArea
                onChange={value =>
                  setFormField(testoAltroSpazioId, value || null)
                }
                onBlur={() => handleFieldBlur(testoAltroSpazioId)}
                placeholder="Specificare altro spazio accettabile qui..."
                inputValue={dataset[testoAltroSpazioId]}
                name={testoAltroSpazioId}
                maxLength={STRING_MAX_VALIDATION.value}
                rows="2"
                error={touched[`${nomeTipoOrario}TestoSpazioAccettabileAltro`] && errors[`${nomeTipoOrario}TestoSpazioAccettabileAltro`]}
              />
            </Column>
          </Row>
        ) : null}
      </Row>
    </Row>
  )
};

TipoSistemazione.displayName = 'TipoSistemazione';
export default TipoSistemazione;
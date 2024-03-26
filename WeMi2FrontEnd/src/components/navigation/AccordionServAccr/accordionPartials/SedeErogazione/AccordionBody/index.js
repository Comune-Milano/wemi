
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Checkbox from 'components/ui2/Checkbox';
import Text from 'components/ui/Text';
import TextArea from 'components/ui2/TextArea';
import styled from 'styled-components';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { Note } from './partial';

const NestedCheckboxWrapper = styled.div`
  position: relative;
  margin-left: 1.7rem;

  &:before{
    position: absolute;
    left: -15px;
    top: -6px;
    content: '';
    display: block;
    border-left: 1px solid #ddd;
    height: 1.3em;
    border-bottom: 1px solid #ddd;
    width: 10px;
  }
`;

const SedeErogazioneBody = ({ Form, SetForm, Modifica, userProfile }) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);
  const labelServizioAccompagnamento = `
    servizio di accompagnamento da casa del beneficiario alla sede
    incluso nel prezzo
  `;

  function UpdateValue(nomeCampo) {
    return (value) => {
      SetForm(prevState => ({
        ...prevState,
        [nomeCampo]: value,
      }));
    };
  }

  const checkboxes = Array.from(Form.checkboxes.entries()).map(([key, value]) => (
    <>
      <div>
        <Checkbox
          key={key}
          id={key}
          label={value.label}
          value={value.checked}
          onChange={(checked) => manageSede(key, checked, value.checkAccompagnamento)}
          disabled={!Modifica.campi}
          width="auto"
        />
      </div>
      {
        value.checked ? (
          <NestedCheckboxWrapper>
            <div>
              <Checkbox
                id={`${key}-servizio-accompagnamento`}
                label={labelServizioAccompagnamento}
                value={value.checkAccompagnamento}
                onChange={checked =>
                manageSede(key, value.checked, checked)
              }
                disabled={!Modifica.campi}
                width="auto"
              />
            </div>
          </NestedCheckboxWrapper>
        ) : null
      }
    </>
  ));

  const manageSede = (key, checked, checkAccompagnamento) => {
    const newMap = new Map(Form.checkboxes);
    const value = newMap.get(key);
    newMap.set(key, {
      ...value,
      checked,
      checkAccompagnamento: !!(checked && checkAccompagnamento),
    });
    SetForm({
      ...Form,
      checkboxes: newMap,
    });
  };

  return (
    <Row padding="0" fluid>
      <Column xs="12">
        <Row fluid margin="0 0 1em 0">
          <Text
            weight="bold"
            size="f7"
            color="blue"
            value="Selezionare almeno una sede di erogazione *"
            required
          />
        </Row>
        <Checkbox
          id="domicilio"
          label="A domicilio"
          value={Form.domicilio}
          onChange={UpdateValue('domicilio')}
          disabled={!Modifica.campi}
          width="auto"
        />
        {checkboxes}
        <Checkbox
          id="altro"
          label="Altra sede e/o da remoto"
          value={Form.altraSedeFlag}
          onChange={(value) => {
            UpdateValue('altraSedeFlag')(value);
            UpdateValue('altraSede')('');
          }}
          disabled={!Modifica.campi}
          width="auto"
        />
        {
          Form.altraSedeFlag ?
            (
              <>
                <NestedCheckboxWrapper>
                  <Checkbox
                    id="altra-sede-servizio-accompagnamento"
                    label={labelServizioAccompagnamento}
                    value={Form.altraSedeFlagAccompagnamento}
                    onChange={(value) => {
                      UpdateValue('altraSedeFlagAccompagnamento')(value);
                    }}
                    disabled={!Modifica.campi}
                    width="auto"
                  />
                </NestedCheckboxWrapper>
                <div style={{ margin: '1em 0' }}>
                  <TextArea
                    readOnly={!Modifica.campi}
                    label="Indicazioni altra sede e/o da remoto"
                    color="blue"
                    maxLength={STRING_MAX_VALIDATION.value}
                    inputValue={Form.altraSede}
                    onChange={UpdateValue('altraSede')}
                  />
                </div>
              </>
            ) : null
        }
      </Column>
      <Column xs="12">
        {
          Form.note || isAmministratore ?
            (
              <Note
                Value={Form.note}
                UpdateValue={UpdateValue('note')}
                Modifica={Modifica}
              />
            ) : null
        }
      </Column>
    </Row>
  );
};

SedeErogazioneBody.displayName = 'Body sede erogazione';

export default withAuthentication(SedeErogazioneBody);

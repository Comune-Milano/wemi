
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const Interessi = ({
  dataset,
  setFormField,
  touched,
  errors,
  handleFieldBlur,
  box,
  locale,
}) => {
  const Seleziona = (value, cdDominio) => {
    let arr = dataset.interessi || [];
    if (value) {
      arr.push(cdDominio);
    } else {
      arr = arr.filter((ele) => !(ele === cdDominio));
    }
    return arr;
  };

  return (
    <>
      <Row fluid>
        <GroupFieldTitle
          marginTop="2em"
          title="Quali sono i tuoi hobby e interessi?"
        />
      </Row>
      <Row fluid>
        {
          box.map((ele) =>
            (
              <Column
                padding="0.5em 0 0 0 "
                {
                  ...(ele.cdDominioTcb === 0 ?
                    { padding: '0.5em 0 0 0' } : {
                      padding: '0',
                      lg: '4',
                      md: '4',
                    }
                )}
                key={ele.cdDominioTcb}
              >
                <Row fluid>
                  <Checkbox
                    value={dataset.interessi && dataset.interessi.includes(ele.cdDominioTcb)}
                    onChange={(value) => { setFormField('interessi', Seleziona(value, ele.cdDominioTcb)); }}
                    label={ele.tlValoreTestuale[locale]}
                    checkcolor="primary"
                    width="fit-content"
                  />
                </Row>
              </Column>
          ))
        }
      </Row>
      { dataset.interessi && dataset.interessi.includes(0) &&
        (
          <Row fluid>
            <TextArea
              placeholder="Scrivi qui altri interessi"
              inputValue={dataset.altroInteressi}
              onBlur={() => handleFieldBlur('altroInteressi')}
              onChange={(value) => setFormField('altroInteressi', value)}
              error={touched.altroInteressi && errors.altroInteressi ? errors.altroInteressi : null}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Row>
        )
      }
    </>
  );
};

Interessi.displayName = 'Interessi';

export default (Interessi);

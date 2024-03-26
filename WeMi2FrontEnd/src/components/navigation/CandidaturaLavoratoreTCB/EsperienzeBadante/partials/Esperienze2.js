import React from 'react';
import { Row } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';


const Esperienze2 = ({
  dataset,
  setFormField,
  handleFieldBlur,
  touched,
  errors,
  locale,
  patologie,
}) => {
  const [patologieSenzaAltro, patologieAltro] = patologie.reduce(
    ([firstAcc, secondAcc], element) => {
      if (element && element.cdDominioTcb === 0) {
        return [firstAcc, element];
      }
      return [firstAcc.concat(element), secondAcc];
    },
    [[], undefined]
  );

  const Seleziona = (value, cdDominio) => {
    let arr = (dataset.esperienzePatologie || []).slice();

    if (value) {
      arr.push(cdDominio);
    } else {
      arr = arr.filter((ele) => !(ele === cdDominio));
    }
    return arr;
  };

  return (
    <>
      <Row fluid margin="2em 0 0 0">
        <GroupFieldTitle
          title="In particolare, con quali di queste patologie o disabilità hai avuto esperienze?"
          marginTop="3em"
        />
      </Row>
      <Row fluid>
        {
          patologieSenzaAltro.map((ele) => (
            <Row fluid key={ele.cdDominioTcb}>
              <Checkbox
                value={dataset.esperienzePatologie && dataset.esperienzePatologie.includes(ele.cdDominioTcb)}
                onChange={(value) => { setFormField('esperienzePatologie', Seleziona(value, ele.cdDominioTcb)); }}
                label={ele.tlValoreTestuale[locale]}
                checkcolor="primary"
                width="fit-content"
              />
            </Row>
            ))
        }
      </Row>
      {
        patologieAltro ? (
          <Row fluid margin="1em 0 0 0">
            <Checkbox
              value={dataset.esperienzePatologie && dataset.esperienzePatologie.includes(patologieAltro.cdDominioTcb)}
              onChange={(value) => { setFormField('esperienzePatologie', Seleziona(value, patologieAltro.cdDominioTcb)); }}
              label={patologieAltro.tlValoreTestuale[locale]}
              checkcolor="primary"
              width="fit-content"
            />
          </Row>
        )
          :
          null
      }
      {dataset.esperienzePatologie && dataset.esperienzePatologie.includes(0) &&
        (
          <Row fluid>
            <TextArea
              placeholder="Scrivi qui altre esperienze"
              inputValue={dataset.altroPatologie}
              onChange={(value) => setFormField('altroPatologie', value)}
              onBlur={() => handleFieldBlur('altroPatologie')}
              error={touched.altroPatologie && errors.altroPatologie}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Row>
        )
      }
    </>
  );
};

Esperienze2.displayName = 'Esperienze2';

export default (Esperienze2);

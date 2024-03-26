import React from 'react';
import { Row } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const Esperienze1 = ({
  dataset,
  setFormField,
  locale,
  patologie,
}) => {
  const Seleziona = (value, cdDominio) => {
    let arr = (dataset.esperienzePatologieGeneriche || []).slice();

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
          title="Quali tipi di disabilità presentavano le persone che hai assistito?"
          marginTop="3em"
        />
      </Row>
      <Row fluid>
        {
            patologie.map((ele) => (
              <Row fluid key={ele.cdDominioTcb}>
                <Checkbox
                  value={dataset.esperienzePatologieGeneriche && dataset.esperienzePatologieGeneriche.includes(ele.cdDominioTcb)}
                  onChange={(value) => { setFormField('esperienzePatologieGeneriche', Seleziona(value, ele.cdDominioTcb)); }}
                  label={ele.tlValoreTestuale[locale]}
                  checkcolor="primary"
                  width="fit-content"
                />
              </Row>
              ))
          }
      </Row>
    </>
  );
};

Esperienze1.displayName = 'Esperienze1';

export default (Esperienze1);

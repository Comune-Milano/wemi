
import React from 'react';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import Checkbox from 'components/ui2/Checkbox';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const CorsiFormazione = ({
  dataset,
  setFormField,
  locale,
  corsiBadante,
  corsiTata,
  handleFieldBlur,
  errors,
  touched,
}) => {
  const Seleziona = (value, cdDominio, arrData) => {
    let arr = arrData.slice() || [];

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
          title="QUALI CORSI DI FORMAZIONE HAI SEGUITO?"
          marginTop="1em"
        />
      </Row>
      <Row fluid margin="0">
        {
          corsiTata.map((ele) => {
            if (ele.pgVisualizzazione > 100) {
              return (
                <Row fluid key={ele.cdDominioTcb}>
                  <Checkbox
                    value={dataset.tata && dataset.tata.includes(ele.cdDominioTcb)}
                    onChange={(value) => { setFormField('tata', Seleziona(value, ele.cdDominioTcb, dataset.tata)); }}
                    label={ele.tlValoreTestuale[locale]}
                    checkcolor="primary"
                    width="fit-content"
                  />
                </Row>
              );
            }
            return (<React.Fragment key={ele.cdDominioTcb}></React.Fragment>);
          })
        }
        {
          corsiBadante.map((ele) => (
            <Row fluid key={ele.cdDominioTcb}>
              <Checkbox
                value={dataset.badante && dataset.badante.includes(ele.cdDominioTcb)}
                onChange={(value) => { setFormField('badante', Seleziona(value, ele.cdDominioTcb, dataset.badante)); }}
                label={ele.tlValoreTestuale[locale]}
                checkcolor="primary"
                width="fit-content"
              />
            </Row>
            ))
        }
      </Row>
      {dataset.badante && dataset.badante.includes(0) &&
        (
          <Row fluid margin="0 0 2em 0">
            <TextArea
              onBlur={() => handleFieldBlur('altroBadante')}
              error={touched.altroBadante && errors.altroBadante}
              placeholder="Scrivi qui altri corsi che hai seguito"
              inputValue={dataset.altroBadante}
              onChange={(value) => setFormField('altroBadante', value)}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Row>
        )
      }
      <Row fluid margin="1.5em 0 0 0">
        <Checkbox
          value={dataset.interesseAfrequentareCorsi}
          onChange={(value) => { setFormField('interesseAfrequentareCorsi', value); }}
          label="Sono interessato/a a frequentare corsi di formazione in ambito socio assistenziale (specificare)"
          checkcolor="primary"
          width="fit-content"
        />
      </Row>
      {dataset.interesseAfrequentareCorsi &&
        (
          <Row fluid margin="0">
            <TextArea
              onBlur={() => handleFieldBlur('nomeCorsoDaFrequentare')}
              error={touched.nomeCorsoDaFrequentare && errors.nomeCorsoDaFrequentare}
              placeholder="Scrivi qui il corso che vorresti frequentare"
              inputValue={dataset.nomeCorsoDaFrequentare}
              onChange={(value) => setFormField('nomeCorsoDaFrequentare', value)}
              maxLength={STRING_MAX_VALIDATION.value}

            />
          </Row>
        )
      }
    </>
  );
};

CorsiFormazione.displayName = 'CorsiFormazione';

export default (CorsiFormazione);

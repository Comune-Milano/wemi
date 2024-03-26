
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import Rating from 'components/ui2/Rating';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const Carattere = ({
  dataset,
  setFormField,
  touched,
  handleFieldBlur,
  errors,
  box,
  locale,
}) => {
  const Seleziona = (value, cdDominio) => {
    let arr = dataset.carattere || [];

    if (value) {
      arr.push(cdDominio);
    } else {
      arr = arr.filter((ele) => !(ele === cdDominio));
    }
    return arr;
  };

  const inputCapacita = [
    { label: 'Valuta le tue capacità comunicative', id: 'comunicative' },
    { label: 'Valuta le tue capacità di adattamento', id: 'adattamento' },
    { label: 'Valuta le tue capacità di gestione del tempo', id: 'tempo' },
  ];

  return (
    <>
      <Row fluid>
        <GroupFieldTitle
          marginTop="2em"
          title="come descriveresti il tuo carattere?"
        />
      </Row>
      <Row fluid>
        {box.map((ele) => {
          if (ele.cdDominioTcb !== 0) {
            return (
              <Column lg="4" md="4" padding="0" key={ele.cdDominioTcb}>
                <Row fluid>
                  <Checkbox
                    value={dataset.carattere && dataset.carattere.includes(ele.cdDominioTcb)}
                    onChange={value => {
                      setFormField('carattere', Seleziona(value, ele.cdDominioTcb));
                    }}
                    label={ele.tlValoreTestuale[locale]}
                    checkcolor="primary"
                    width="fit-content"
                  />
                </Row>
              </Column>
            );
          }
        })}
        {box.map((ele) => {
          if (ele.cdDominioTcb === 0) {
            return (
              <Column padding="0.5em 0 0 0" key={ele.cdDominioTcb}>
                <Row fluid>
                  <Checkbox
                    value={dataset.carattere && dataset.carattere.includes(ele.cdDominioTcb)}
                    onChange={value => {
                      setFormField('carattere', Seleziona(value, ele.cdDominioTcb));
                    }}
                    label={ele.tlValoreTestuale[locale]}
                    checkcolor="primary"
                    width="fit-content"
                  />
                </Row>
              </Column>
            );
          }
        })}
      </Row>
      {dataset.carattere && dataset.carattere.includes(0) && (
        <Row fluid>
          <TextArea
            placeholder="Scrivi qui i lati del tuo carattere"
            inputValue={dataset.altroCarattere}
            onBlur={() => handleFieldBlur('altroCarattere')}
            onChange={value => setFormField('altroCarattere', value)}
            error={touched.altroCarattere && errors.altroCarattere ? errors.altroCarattere : null}
            maxLength={STRING_MAX_VALIDATION.value}
          />
        </Row>
      )}
      <Row fluid>
        <GroupFieldTitle
          marginTop="2em"
          marginBottom="0.5em"
          title="Come valuti le tue capacità?"
        />
        {inputCapacita.map(ele => (
          <Row fluid key={ele.id}>
            <Column xs="8" sm="6" md="6" lg="6" padding="0.5em 0 0.5em 0">
              <Text
                intlFormatter
                value={ele.label}
                color="black"
                size="f7"
                aria-label={ele.label}
                tabindex="0"
              />
            </Column>
            <Column xs="4" sm="4" md="4" lg="4" padding="0.5em 0.5em 0.5em 0.5em">
              <Rating
                fontSize="f6"
                color="primary"
                onClick={value => {
                  setFormField(ele.id, value);
                }}
                stars={dataset[ele.id]}
              />
            </Column>
          </Row>
          ))}
      </Row>
    </>
  );
};

Carattere.displayName = 'Carattere';

export default (Carattere);

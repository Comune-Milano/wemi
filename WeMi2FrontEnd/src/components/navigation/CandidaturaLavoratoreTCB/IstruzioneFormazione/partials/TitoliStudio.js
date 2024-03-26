
import React from 'react';
import { Row } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { CD_DOMINIO_TCB_LAUREA, CD_DOMINIO_TCB_ALTRO } from 'types/tcbConstants';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const TitoliStudio = ({
  dataset,
  setFormField,
  locale,
  corsi,
  handleFieldBlur,
  errors,
  touched,
}) => {
  const Seleziona = (value, cdDominio) => {
    let arr = dataset.tata.slice() || [];
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
          title="Quale titolo di studio hai conseguito?"
          marginTop="0"
        />
      </Row>
      <Row fluid margin="0 0 1.5em 0">
        {
          corsi.map((ele) => {
            if (ele.pgVisualizzazione < 100) {
              return (
                <React.Fragment key={ele.cdDominioTcb}>
                  <Row fluid>
                    <Checkbox
                      value={dataset.tata && dataset.tata.includes(ele.cdDominioTcb)}
                      onChange={(value) => { setFormField('tata', Seleziona(value, ele.cdDominioTcb)); }}
                      label={ele.tlValoreTestuale[locale]}
                      checkcolor="primary"
                      width="fit-content"
                    />
                  </Row>
                  {ele?.cdDominioTcb === CD_DOMINIO_TCB_LAUREA && dataset.tata?.includes(CD_DOMINIO_TCB_LAUREA) &&
                    (
                      <Row fluid margin="0 0 0.5em 0">
                        <TextArea
                          onBlur={() => handleFieldBlur('nomeLaurea')}
                          error={touched.nomeLaurea && errors.nomeLaurea}
                          placeholder="Specificare il corso di laurea"
                          inputValue={dataset.nomeLaurea}
                          onChange={(value) => setFormField('nomeLaurea', value)}
                          maxLength={STRING_MAX_VALIDATION.value}
                        />
                      </Row>
                    )
                  }
                  {ele?.cdDominioTcb === CD_DOMINIO_TCB_ALTRO && dataset.tata?.includes(CD_DOMINIO_TCB_ALTRO) &&
                    (
                      <Row fluid margin="0">
                        <TextArea
                          onBlur={() => handleFieldBlur('altroTata')}
                          error={touched.altroTata && errors.altroTata}
                          placeholder="Scrivi qui altri titoli di studio"
                          inputValue={dataset.altroTata}
                          onChange={(value) => setFormField('altroTata', value)}
                          maxLength={STRING_MAX_VALIDATION.value}
                        />
                      </Row>
                    )
                  }
                </React.Fragment>
              );
            }
            return (<React.Fragment key={ele.cdDominioTcb}></React.Fragment>);
          })
        }
      </Row>
    </>
  );
};

TitoliStudio.displayName = 'TitoliStudio';

export default (TitoliStudio);

import React from 'react';

import { Row, Column } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import { Esperienza, Qualifiche, Note } from './partial';
const PersonaleInternoBody = ({ Form, SetForm, Modifica, userProfile }) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);
  function updateValue(nomeCampo) {
    return (value) => {
      SetForm({
        ...Form,
        [nomeCampo]: value,
      });
    };
  }

  function updateValueQualifiche(newValue) {
    if (newValue.length === 0) {
      SetForm({
        ...Form,
        qualificheInterne: newValue,
        anniEsperienza: '',
      });
    } else { SetForm({ ...Form, qualificheInterne: newValue }); }
  }

  return (
    <Row padding="0" fluid display="flex">
      <Column xs="12">
        <Qualifiche
          Value={{
            listaSelezionata: Form.qualificheInterne,
            listaCompleta: Form.personaleCompleto,
          }}
          UpdateValue={updateValueQualifiche}
          Modifica={Modifica}
        >
        </Qualifiche>
      </Column>
      <Column xs="6">
        <Esperienza
          Qualifiche={Form.qualificheInterne}
          Value={Form.anniEsperienza}
          UpdateValue={updateValue('anniEsperienza')}
          Modifica={Modifica}
        >
        </Esperienza>
      </Column>

      <Column xs="12">
        {
                    Form.note || isAmministratore ? (
                      <Note
                        Value={Form.note}
                        UpdateValue={updateValue('note')}
                        Modifica={Modifica}
                      >
                      </Note>
                  )
                    : null
                }
      </Column>
    </Row>
  );
};

PersonaleInternoBody.displayName = 'Body personale interno';


export default withAuthentication(PersonaleInternoBody);

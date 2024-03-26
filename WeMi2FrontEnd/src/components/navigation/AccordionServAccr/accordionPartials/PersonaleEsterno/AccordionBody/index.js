import React from 'react';

import { Row, Column } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import { Esperienza, Note, Nomi, Qualifiche } from './partial';

const PersonaleEsternoBody = ({ Form, SetForm, Modifica, userProfile }) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);

  function updateValue(nomeCampo) {
    return (value) => {
      SetForm({
        ...Form,
        [nomeCampo]: value,
      });
    };
  }

  const required = Form.anniEsperienza || Form.nomiFornitori || Form.qualificheEsterne?.length > 0;
  return (
    <Row padding="0" fluid display="flex">
      <Column xs="12">
        <Nomi
          Value={{
            value: Form.nomiFornitori,
            required,
          }}
          UpdateValue={updateValue('nomiFornitori')}
          Modifica={Modifica}
        >
        </Nomi>
      </Column>
      <Column xs="12">
        <Qualifiche
          Value={{
            listaSelezionata: Form.qualificheEsterne,
            listaCompleta: Form.personaleCompleto,
            required,
          }}
          UpdateValue={updateValue('qualificheEsterne')}
          Modifica={Modifica}
        />
      </Column>
      <Column xs="6">
        <Esperienza
          Value={{
            value:
              Form.anniEsperienza,
            required,
          }}
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

PersonaleEsternoBody.displayName = 'Body personale esterno';


export default withAuthentication(PersonaleEsternoBody);

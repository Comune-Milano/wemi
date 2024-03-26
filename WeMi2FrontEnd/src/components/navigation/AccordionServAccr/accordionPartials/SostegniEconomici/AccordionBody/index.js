import React from 'react';

import { Row, Column } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import { SostegniEconomici, Note } from './partial';
const SostegniEconomiciBody = ({ Form, SetForm, Modifica, userProfile }) => {
  function updateValue(nomeCampo) {
    return (value) => {
      SetForm({
        ...Form,
        [nomeCampo]: value,
      });
    };
  }


  const isAmministratore = checkAdmin(userProfile.datiLogin);

  return (
    <Row padding="0" fluid>
      <Column xs="10">
        <SostegniEconomici
          Value={{
            listaSelezionata: Form.listaSelezionataSostegni,
            listaCompleta: Form.listaCompletaSostegni,
          }}
          UpdateValue={updateValue('listaSelezionataSostegni')}
          Modifica={Modifica}
        >
        </SostegniEconomici>
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

SostegniEconomiciBody.displayName = 'Body sostegni economici';


export default withAuthentication(SostegniEconomiciBody);

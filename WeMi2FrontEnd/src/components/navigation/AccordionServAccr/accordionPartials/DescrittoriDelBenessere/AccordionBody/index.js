import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import checkAdmin from 'utils/functions/checkAdmin';
import withAuthentication from 'hoc/withAuthentication';
import InputNumbers from './partials/InputNumbers';
import Note from './partials/Note';

const DescrittoriDelBenessereBody = ({ Form, SetForm, Modifica, userProfile }) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);

  const UpdateValue = React.useCallback((value, key) => {
    SetForm({
      ...Form,
      [key]: value,
    });
  });

  return (
    <Row padding="0" fluid display="flex">
      <Column>
        <InputNumbers
          Form={Form}
          UpdateValue={UpdateValue}
          Modifica={Modifica}
        />
      </Column>
      <Column xs="12">
        {
          Form.note || isAmministratore ? (
            <Note
              Value={Form.note}
              UpdateValue={UpdateValue}
              Modifica={Modifica}
            />
          )
            : null
        }
      </Column>
    </Row>
  );
};

DescrittoriDelBenessereBody.displayName = 'Body Dimensione Del Benessere';


export default withAuthentication(DescrittoriDelBenessereBody);

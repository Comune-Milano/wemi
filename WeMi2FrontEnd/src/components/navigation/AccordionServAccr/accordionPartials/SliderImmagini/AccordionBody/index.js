import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import checkAdmin from 'utils/functions/checkAdmin';
import withAuthentication from 'hoc/withAuthentication';
import { ListAttachment } from './partials/ListAttachment';
import Note from './partials/Note';

const SliderImmaginiBody = ({ Form = {}, SetForm, Modifica, userProfile }) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);

  const UpdateValue = React.useCallback((key, value) => {
    SetForm({
      ...Form,
      [key]: value,
      change: key,
    });
  });

  return (
    <Row padding="0" fluid display="flex">
      <Column>
        <ListAttachment
          Form={Form}
          UpdateValue={UpdateValue}
          Modifica={Modifica}
        />
      </Column>
      <Column>
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

SliderImmaginiBody.displayName = 'Body Slider Immagini';


export default withAuthentication(SliderImmaginiBody);

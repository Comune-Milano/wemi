/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import NavLink from 'components/router/NavLink';
import { withRouter } from 'react-router';
import TextArea from 'components/ui2/TextArea';
import Button from 'components/ui2/Button';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { chiudiRichiestaServizioEnte as chiudiRichiestaServizioEnteM } from './graphql/FormRifiutoGraphql';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const Form = ({
  notesValue,
  getNotesValue,
  richiesta,
}) => {
  const updateDatiRichiestaEnte = useStatelessGraphQLRequest(chiudiRichiestaServizioEnteM);

  return (
    <Row fluid>
      <Row fluid margin=" 0">
        <Column xs="12" md="7" padding="1em 0 0">
          <TextArea
            onChange={getNotesValue}
            inputValue={notesValue}
            width="100%"
            label="Informazioni Aggiuntive"
            maxLength={STRING_MAX_VALIDATION.value}
            placeholder="Scrivi qui"
            size="f7"
          />
        </Column>
      </Row>
      <Row fluid margin="1em 0">
        <Column xs="12" md="7" padding="0">
          <Row fluid justifycontent="space-between">
            <Column xs="4" padding="1em 0">
              <NavLink to={`/e/${window.location.pathname.split('e/')[1].split('/handleRequests/')[0]}/handleRequests/`} width="100%">
                <Button color="primary" width="100%" label="annulla" size="f7" />
              </NavLink>
            </Column>
            <Column xs="4" padding="1em 0">
              {!isNullOrUndefined(notesValue) && (notesValue && notesValue.length > 0) ? (
                <NavLink to={`/e/${window.location.pathname.split('e/')[1].split('/handleRequests/')[0]}/handleRequests/`} width="100%">
                  <Button
                    color="primary"
                    width="100%"
                    label="Conferma"
                    size="f7"
                    onClick={() => {
                      updateDatiRichiestaEnte({
                        idRichiestaEnte: richiesta.id_richiesta_servizio_ente,
                        txNote: notesValue,
                      });
                    }
                    }
                  />
                </NavLink>
              ) : <Button disabled width="100%" label="Conferma" size="f7" />}
            </Column>
          </Row>
        </Column>
      </Row>
    </Row>
  );
};


Form.displayName = 'Form';

const FormWithAuth = withAuthentication(Form);

export default withRouter(FormWithAuth);

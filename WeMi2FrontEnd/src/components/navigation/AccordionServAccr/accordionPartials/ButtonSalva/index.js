import React, { useState } from 'react';
import isEqual from 'react-fast-compare';
import Button from 'components/ui/Button';
import ModaleServizioEnte from 'components/shared/ModaleServizioEnte';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import { OPERATORE_ENTE, AMMINISTRATORE_ENTE, AMMINISTRATORE } from 'types/userRole';
import { withRouter, generatePath } from 'react-router';
import checkEnte from 'utils/functions/checkEnte';
import checkAdmin from 'utils/functions/checkAdmin';
import { PAGE_ENTE_GOI_004_URL, PAGE_ADMIN_ENTE_GOI_004_URL } from 'types/url';
import {
    InserisciDatiServizioEnte as InserisciDatiServizioEnteM,
    setDatiPrezzo as setDatiPrezzoM,
} from './SalvaSchedaEnteGraphQL';
import { mapFormToBody, validateForm, createJsonDatiPrezzo } from './utils';

const ButtonSalva = ({
    userProfile,
    Form,
    ReadOnly,
    locale,
    StartForm,
    history,
    estraiDati,
}) => {
  const [formToCheck, setFormToCheck] = React.useState(StartForm);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [modaleServizioEnteData, setModaleServizioEnteData] = React.useState({
    open: false,
    idServizioRiferimento: null,
    idEnte: null,
  });
  const closeModaleServizioEnte = () => {
    setModaleServizioEnteData(old => ({
      idServizioRiferimento: null,
      idEnte: null,
      open: false,
    }));
  };

  const [isVisibleButton, setIsVisibile] = useState(false);
  const [isVisibleSummaryButton, setIsVisibleSummary] = useState(false);

  const openModaleServizioEnte = (idServizioRiferimento, idEnte) => (
        setModaleServizioEnteData({
          idServizioRiferimento,
          idEnte,
          open: true,
        })
    );
  const InserisciDatiServizioEnte = useStatelessGraphQLRequest(
        InserisciDatiServizioEnteM
    );
  const setDatiPrezzo = useStatelessGraphQLRequest(setDatiPrezzoM);
  const { datiLogin } = userProfile;
  const isEnte = datiLogin.Profilo === (OPERATORE_ENTE || AMMINISTRATORE_ENTE);
  const isAmministratore = datiLogin.Profilo === AMMINISTRATORE;
  const validate = validateForm(Form);
  const statoDati = Form.cdStatoDati;
  const visualizzaSalva = !ReadOnly && ((isEnte && [2, 21, 30].indexOf(statoDati) >= 0)
        || (isAmministratore && [22, 31, 4].indexOf(statoDati) >= 0));

  const visualizzaInoltraNote = isAmministratore && [22, 4].indexOf(statoDati) >= 0;
  const visualizzaInoltraScheda = isEnte && visualizzaSalva;
  const visualizzaDisattiva = isAmministratore && [2, 21, 22, 30, 31].indexOf(statoDati) >= 0;
  const visualizzaValida = isAmministratore && [22, 4].indexOf(statoDati) >= 0;
  const visualizzaDisattivaEModifica = isEnte && [31].indexOf(statoDati) >= 0;
  const id_utente = datiLogin && datiLogin.idCittadino;

  // 21 in compilazione
  // 2 da compilare
  // 22 compilata
  // 30 da correggere
  // 31 validata
  // 4 disattiva
  // Function that do history.push to generate path after control the role of user
  const redirectByRole = () => {
    if (checkEnte(datiLogin)) {
      return history.push(generatePath(PAGE_ENTE_GOI_004_URL, {
        idEnte: Form.ente.idEnte,
      }));
    }
    if (checkAdmin(datiLogin)) {
      return history.push(generatePath(PAGE_ADMIN_ENTE_GOI_004_URL, {
        idEnte: Form.ente.idEnte,
      }));
    }
  };

  return (
    <Row fluid justifycontent="space-between">
      <Column xs="3">
        <Button
          value="Annulla"
          type="cancel"
          onClick={() => redirectByRole()}
        />
      </Column>
      {
                visualizzaSalva ? (
                  <Column xs="3">
                    <Button
                      value="Salva ed esci"
                      onClick={async () => {
                        setIsVisibile(true);
                        setDatiPrezzo({
                          input: createJsonDatiPrezzo(Form),
                        });
                        const mapFormBody = mapFormToBody(Form,
                                    [2, 30].indexOf(statoDati) >= 0 ? 21 : statoDati,
                                    locale,
                                    Form.servizio.listaCompletaMunicipi);
                        await InserisciDatiServizioEnte({
                          input: mapFormBody,
                        });
                        redirectByRole();
                      }}
                      disabled={isVisibleButton}
                      type={!isVisibleButton ? '' : 'disabled'}
                    >
                    </Button>
                  </Column>
                  )
                    : null
            }
      <Column xs="3">
        <Button
          value="Riepilogo servizio"
          onClick={() => {
            if (!isEqual(formToCheck, Form)) {
              setOpenAlert(true);
            } else {
              openModaleServizioEnte(
                                Form.informazioni.idServizioEnte,
                                Form.ente.idEnte
                            );
            }
          }}
        />
      </Column>
      {
                visualizzaInoltraNote ? (
                  <Column xs="3">

                    <Button
                      value="Inoltra ad ente"
                      onClick={async () => {
                        setDatiPrezzo({
                          input: createJsonDatiPrezzo(Form),
                        });
                        const mapFormBody = mapFormToBody(Form,
                                            30,
                                            locale,
                                            Form.servizio.listaCompletaMunicipi);
                        await InserisciDatiServizioEnte({
                          input: mapFormBody,
                        });
                        redirectByRole();
                      }}
                    >
                    </Button>
                  </Column>
                  )
                    : null
            }

      {
                visualizzaValida ? (
                  <Column xs="3">
                    <Button
                      value="Valida scheda"
                      onClick={async () => {
                        setDatiPrezzo({
                          input: createJsonDatiPrezzo(Form),
                        });
                        const mapFormBody = mapFormToBody(
                                            Form,
                                            31,
                                            locale,
                                            Form.servizio.listaCompletaMunicipi
                                        );
                        await InserisciDatiServizioEnte({
                          input: mapFormBody,
                        });
                        redirectByRole();
                      }}
                    >
                    </Button>
                  </Column>
                  )
                    : null
            }

      {
                visualizzaDisattiva ? (
                  <Column xs="3">
                    <Button
                      value="Disattiva"
                      onClick={async () => {
                        setDatiPrezzo({
                          input: createJsonDatiPrezzo(Form),
                        });
                        const mapFormBody = mapFormToBody(
                                            Form,
                                            4,
                                            locale,
                                            Form.servizio.listaCompletaMunicipi
                                        );
                        await InserisciDatiServizioEnte({
                          input: mapFormBody,
                        });
                        redirectByRole();
                      }}
                    >
                    </Button>
                  </Column>
                  )
                    : null
            }

      {
                visualizzaInoltraScheda ? (
                  <Column xs="3">
                    <Button
                      disabled={!validate}
                      type={validate ? '' : 'disabled'}
                      value="Inoltra scheda"
                      onClick={async () => {
                        setDatiPrezzo({
                          input: createJsonDatiPrezzo(Form),
                        });
                        const mapFormBody = mapFormToBody(
                                            Form,
                                            22,
                                            locale,
                                            Form.servizio.listaCompletaMunicipi
                                        );
                        await InserisciDatiServizioEnte({
                          input: mapFormBody,
                        });
                        redirectByRole();
                      }}
                    >
                    </Button>
                  </Column>
                  )
                    : null
            }
      {
                visualizzaDisattivaEModifica ? (
                  <Column xs="3">
                    <Button
                      value="Disattiva e modifica"
                      onClick={async () => {
                        setDatiPrezzo({
                          input: createJsonDatiPrezzo(Form),
                        });
                        const mapFormBody = mapFormToBody(
                                            Form,
                                            30,
                                            locale,
                                            Form.servizio.listaCompletaMunicipi
                                        );
                        await InserisciDatiServizioEnte({
                          input: mapFormBody,
                        });
                        redirectByRole();
                      }}
                    >
                    </Button>

                  </Column>
                  )
                    : null
            }
      <ModaleServizioEnte
        idEnte={modaleServizioEnteData.idEnte}
        idServizioEnte={modaleServizioEnteData.idServizioRiferimento}
        open={modaleServizioEnteData.open}
        setOpen={closeModaleServizioEnte}
        onClose={estraiDati}
      />
      <Modal
        open={openAlert}
        setOpenModal={setOpenAlert}
        title="Attenzione"
        color="blue"
        fontSize="f6"
        paddingTopTitle="2rem"
        width="50%"
      >
        <Row>
          <Column>
            <Text
              value="Il riepilogo ignora le modifiche non ancora salvate; vuoi salvare prima di vedere il riepilogo?"
              size="f6"
              color="red"
            />
          </Column>
        </Row>
        <Row fluid flex justifycontent="space-between">
          <Column xs="4">
            <Button
              value="Si"
              onClick={async() => {
                setIsVisibleSummary(true);
                await setDatiPrezzo({
                  input: createJsonDatiPrezzo(Form),
                });
                const mapFormBody = mapFormToBody(
                                    Form,
                                    [2, 30].indexOf(statoDati) >= 0 ? 21 : statoDati,
                                    locale,
                                    Form.servizio.listaCompletaMunicipi
                                );
                await InserisciDatiServizioEnte({
                  input: mapFormBody,
                });
                setFormToCheck(Form);
                setOpenAlert(false);
                openModaleServizioEnte(
                                    Form.informazioni.idServizioEnte,
                                    Form.ente.idEnte
                                );
              }}
              disabled={isVisibleSummaryButton}
              type={!isVisibleSummaryButton ? '' : 'disabled'}
            />
          </Column>
          <Column xs="4">
            <Button
              value="No"
              onClick={() => {
                setOpenAlert(false);
                openModaleServizioEnte(
                                    Form.informazioni.idServizioEnte,
                                    Form.ente.idEnte
                                );
              }}
            />
          </Column>
        </Row>

      </Modal>
    </Row>
  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
});

ButtonSalva.displayName = 'ButtonSalva';

export default connect(mapStoreToProps)(withAuthentication(withRouter(ButtonSalva)));

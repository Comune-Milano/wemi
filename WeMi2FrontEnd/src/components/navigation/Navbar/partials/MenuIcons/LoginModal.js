/** @format */

import React, { useState } from "react";
import { connect } from "react-redux";
import { openLoginModal } from 'redux-modules/actions/authActions';
import { userLoggedIn as userLoggedInAction } from "redux-modules/actions/authActions";
import { Row, Column } from "components/ui/Grid";
import Button from "components/ui/Button";
import Text from "components/ui/Text";
import Image from "components/ui/Image";
import Input from "components/ui/Input";
import { useStatelessGraphQLRequest } from "hooks/graphQLRequest/useStatelessGraphQLRequest";
import { LoginModalJson } from "./LoginModalJson";
import { estraiDatiLoginEnte as estraiDatiLoginEnteQ } from '../../menuGraphQL';

const LoginModal = ({ open, openModal, userLoggedIn }) => {
  const [showComponent, setShowComponent] = useState(open);
  const [parolaChiave, setParolaChiave] = useState('');
  const [loginErrorVisible, setLoginErrorVisible] = useState(false);
  const estraiDatiLoginEnte = useStatelessGraphQLRequest(estraiDatiLoginEnteQ);

  const StorageLoginNew = async () => {
    const Utente = { userId: parolaChiave };
    let loginSuccess = true;

    switch (parolaChiave) {
      case "cittadino": {
        Utente.Profilo = "C";
        Utente.Nome = " Alessandro ";
        Utente.Ruolo = "Cittadino";
        Utente.idCittadino = 2;
        break;
      }
      case "ente": {
        Utente.Profilo = "E";
        Utente.Nome = " Agata ";
        Utente.Ruolo = "Ente";
        Utente.idEnte = 700002;
        Utente.idCittadino = 10;
        break;
      }
      case "ente1": {
        Utente.Profilo = "E";
        Utente.Nome = "Prova D4";
        Utente.Ruolo = "Ente";
        Utente.idEnte = 220;
        Utente.idCittadino = 9;
        break;
      }
      case "sistinf": {
        Utente.Profilo = "E";
        Utente.Nome = "sistinf";
        Utente.Ruolo = "Ente";
        Utente.idEnte = 200;
        Utente.idCittadino = 9;
        break;
      }
      case "adminWeMi": {
        Utente.Profilo = "A";
        Utente.Nome = " Cesare ";
        Utente.Ruolo = "Amministratore WeMi";
        Utente.idCittadino = 1;
        break;
      }
      case "adminEnte": {
        Utente.Profilo = "AE";
        Utente.Nome = " Cesare ";
        Utente.Ruolo = "Amministratore Ente";
        Utente.idEnte = 700001;
        Utente.idCittadino = 10;
        break;
      }
      case "lavoratore": {
        Utente.Profilo = "L";
        Utente.Nome = " Roxana ";
        Utente.Ruolo = "Lavoratore";
        break;
      }
      default: {
        try {
          const response = await estraiDatiLoginEnte({ idEnte: parseInt(parolaChiave, 10) });

          Utente.Profilo = 'E';
          Utente.Nome = response.ptx_username || ' Agata ';
          Utente.Ruolo = 'Ente';
          Utente.idEnte = parolaChiave;
          Utente.idCittadino = response.id_utente;
        } catch (e) {
          setLoginErrorVisible(true);
          loginSuccess = false;
        }
      }
    }

    if (loginSuccess) {
      openModal(!open);
      userLoggedIn(Utente);
    }
  };

  const leggiTesto = event => {
    setLoginErrorVisible(false);
    setParolaChiave(event.target.value);
  };
  return (
    <>
      {showComponent === false ? (
        <Row fluid justifycontent="center" padding="1em 0 2em">
          {LoginModalJson.bottoni.map((element,index) => (
          <Column key={index.toString()} justifycontent="space-between" flex direction="column" alignitems="center" padding="0 1em 2em"
          lg={6} md={6} xs={12} >
            
                <Column flex xs="12" padding="0"  justifycontent="center" alignitems="center">
                <Image  src={element.img}   />
                </Column>
                <Column flex xs="12" padding="2em 0"  justifycontent="center" alignitems="center">
                <Text value={element.text} tag="h4" intlFormatter align="center" />
                </Column>
                <Column fluid xs="5" sm="4" md="4" >
              <Button
                value={element.button}
                onClick={() => {
                  openModal.bind(this);
                  setShowComponent(!showComponent);
                }}
                intlFormatter
                />
                </Column>
                </Column>
          ))}

          <Row
            fluid
            justifycontent="center"
            alignContent="center"
            alignitems="center"
          >
            <Column lg={12} md={12} padding="1em 0">
              <Text value={LoginModalJson.link} intlFormatter tag="p" />
              <Text value={LoginModalJson.link1} intlFormatter tag="p" />
            </Column>
          </Row>
        </Row>
      ) : null}
      {showComponent === true ? (
        <Row fluid justifycontent="center" padding="1em 0 2em">
          <form>
            <Row fluid justifycontent="center">
            <Column  md={9} sm={12} xs={12}>
                <Input
                  material
                  intlLabel="Username"
                  intlPlaceholder="Inserisci il tuo username"
                  onChange={leggiTesto}
                  required
                />
                {
                  loginErrorVisible ?
                    (
                      <Text
                        margin="6px 0 0 0"
                        value="Username non valido. Riprova."
                        color="red"
                        tag="div"
                      />
                    ) : null
                }
            </Column>

            </Row>

            <Row fluid justifycontent="center">

            <Column md={9} sm={12} xs={12}>              
                <Input
                  type="Password"
                  material
                  intlLabel="Password"
                  intlPlaceholder="Inserisci la tua password"
                  onChange={leggiTesto}
                  required
                />
            </Column>

            </Row>
          
          
            <Row fluid justifycontent="space-around">
              <Column md={3} sm={6} xs={6}>
              <Button
                  value="Indietro"
                  onClick={() => {
                    setShowComponent(!showComponent);
                  }}
                  intlFormatter
                />
              </Column>
              <Column md={3} sm={6} xs={6}>
                <Button onClick={StorageLoginNew} value="Accedi" intlFormatter />
              </Column>
            </Row>
          </form>
        </Row>
      ) : null}
    </>
  );
};

LoginModal.displayName = "LoginModal";

function mapStateToProps(state) {
  const { user } = state;
  const { enti } = user;
  return {
    array: enti
  };}
const mapDispatchToProps = ({
  
  userLoggedIn: userLoggedInAction,
  openLoginModal,

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);

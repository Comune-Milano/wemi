/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Column } from "components/ui/Grid";
import Button from "components/ui/Button";
import Text from "components/ui/Text";
import Image from "components/ui/Image";
import { LoggedModalJson } from "./LoggedModalJson";
import { connect } from "react-redux";
import { userSelector } from "redux-modules/selectors/userSelectors";

const LoggedModal = ({ open, openModal }) => {

  const strDatiLogin = sessionStorage.getItem('DatiLogin');
  const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);

  const LogOut = (element) => {
    if(element && element === true){
    sessionStorage.setItem('DatiLogin', null)
    }
  }
  switch (DatiLogin && DatiLogin.Profilo) {
    case "E":
      {
        return (
          <Row fluid justifycontent="center">
             {LoggedModalJson.Ente.map((element,index) => (
          <Column key={index.toString()} justifycontent="space-between" flex direction="column" alignitems="center" 
          lg={6} md={6} xs={12}>
            
                <Column xs="12" flex padding="0"  justifycontent="center" alignitems="center">
                <Image  src={element.img}  />
                </Column>
                <Column xs="12" flex padding="1em 0"  justifycontent="center" alignitems="center">
                <Text tag="p" value={element.text} intlFormatter align="center" />
                </Column>
                <Column padding="0 0 1em 0" xs="5" sm= "4" md="4" >
                  <NavLink to={element.url}>
              <Button
                value={element.button}
                onClick={() => {
                  openModal.bind(this);
                  openModal(!open);
                  LogOut(element.logout);
                }}
                intlFormatter
                />
                </NavLink>
                </Column>
                </Column>
          ))}
          </Row>
        );
      }
      break;

    case "C":
      {
        return (
          <Row fluid justifycontent="center" >
                    {LoggedModalJson.Cittadino.map((element,index) => (
          <Column key={index.toString()} justifycontent="space-between" flex 
          direction="column" alignitems="center" 
          lg="6" md="6" xs="12">
            
                <Column flex xs="12" padding="0"  justifycontent="center" alignitems="center">
                <Image  src={element.img}  />
                </Column>
                <Column flex xs="12" padding="1em 0"  justifycontent="center" alignitems="center">
                <Text tag="p" value={element.text} intlFormatter align="center" />
                </Column>
                <Column padding="0 0 1em 0" xs="5" sm="4" md="4" >
                <NavLink to={element.url}>
              <Button
                value={element.button}
                onClick={() => {
                  openModal.bind(this);
                  openModal(!open);
                  LogOut(element.logout);
                }}
                intlFormatter
                />
                </NavLink>
                </Column>
                </Column>
          ))}
          </Row>
        );  
        break;
      }


    case "L":
      {
        return (
          <Row fluid justifycontent="center" >
                    {LoggedModalJson.Cittadino.map((element,index) => (
          <Column key={index.toString()} justifycontent="space-between" flex 
          direction="column" alignitems="center" 
          lg="6" md="6" xs="12">
            
                <Column flex xs="12" padding="0"  justifycontent="center" alignitems="center">
                <Image  src={element.img}  />
                </Column>
                <Column flex xs="12" padding="1em 0"  justifycontent="center" alignitems="center">
                <Text tag="p" value={element.text} intlFormatter align="center" />
                </Column>
                <Column padding="0 0 1em 0" xs="5" sm="4" md="4" >
                <NavLink to={element.url}>
              <Button
                value={element.button}
                onClick={() => {
                  openModal.bind(this);
                  openModal(!open);
                  LogOut(element.logout);
                }}
                intlFormatter
                />
                </NavLink>
                </Column>
                </Column>
          ))}
          </Row>
        );
      }

      break;

    case "A":
      {
        return (
          <Row fluid justifycontent="center" padding="0 0 2em">

{LoggedModalJson.Amministratore.map((element,index) => (
          <Column key={index.toString()} justifycontent="space-between" flex direction="column" alignitems="center" 
          lg={6} md={6} xs={12}>
            
                <Column flex xs="12" padding="0"  justifycontent="center" alignitems="center">
                <Image  src={element.img}  />
                </Column>
                <Column flex xs="12" padding="1em 0"  justifycontent="center" alignitems="center">
                <Text tag="p" value={element.text} intlFormatter align="center" />
                </Column>
                <Column flex padding="0 0 1em 0" xs="5" sm= "4" md="4" >
                <NavLink to={element.url}>
              <Button
                value={element.button}
                onClick={() => {
                  openModal.bind(this);
                  openModal(!open);
                  LogOut(element.logout);
                }}
                intlFormatter
                />
                </NavLink>
                </Column>
                </Column>
          ))}
          </Row>
        );
      }
      break;

    default:
      break;
  }
};

LoggedModal.displayName = "LoggedModal";

const mapStoreToProps = store => ({
  datiLogin: userSelector(store)
});

export default connect(
  mapStoreToProps,
  null
)(LoggedModal);

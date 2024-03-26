/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Column } from "components/ui/Grid";
import Button from "components/ui2/Button";
import Text from "components/ui/Text";
import Image from "components/ui/Image";
import LoggedModalJson from "./LoggedModalJson";
import checkProfile from "utils/functions/checkProfile";
import withAuthentication from "hoc/withAuthentication";
import { __AUTH_DEV__, __LOGOUT_WEBSEAL_URL__ } from "utils/environment/variables";

const LoggedModal = ({ open, openModal, userProfile, setUserProfile }) => {
  const DatiLogin = userProfile.datiLogin;

  const LogOut =  async (element) => {
    if (element !== true) {
      return;
    }
    
    await setUserProfile({...userProfile, datiLogin: null});
    
    window.location.href = '/logout';
    
  }

  const profilo = checkProfile(DatiLogin && DatiLogin.Profilo);
  const typeOfProfile = Object.keys(LoggedModalJson);

  return (
    <>
    <Column xs="12" />
    <Row justifycontent="center">
      {typeOfProfile.map(profile => {
        return LoggedModalJson[profile].map((element, index) => {
          if (element.profile === profilo)
            return (
            <Column key={index.toString()} justifycontent="space-between" flex direction="column" alignitems="center"
              lg={6} md={6} xs={12}>

              <Column xs="12" padding="0" flex justifycontent="center" alignitems="center">
                <Image src={element.img} />
              </Column>
              <Column xs="12" padding="1em 0" flex justifycontent="center" alignitems="center">
                <Text value={element.text} intlFormatter align="center" />
              </Column>
           
                <NavLink to={element.url}>
                  <Button
                    label={element.button}
                    onClick={() => {
                      openModal(!open);
                      LogOut(element.logout);
                    }}
                    intlFormatter
                  />
                </NavLink>
            </Column>
            )
        });
      })}</Row>
      </>);
};

LoggedModal.displayName = "LoggedModal";


export default withAuthentication(LoggedModal);

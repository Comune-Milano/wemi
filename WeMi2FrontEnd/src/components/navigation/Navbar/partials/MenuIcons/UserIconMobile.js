/** @format */

import React from 'react';
import Dropdown from 'components/ui/Dropdown';
import FaIcon from 'components/ui/FaIcon';

const UserIconMobile = ({scrollDown, open, DatiLogin, openModal}) => (
        <FaIcon 
          role="menuitem" 
          tabIndex={0} 
          aria-label={DatiLogin ? "Area utente" : "Login"} 
          noShadow 
          icon="\f406" 
          fontSize="f3" 
          color="white" 
          onClick={() => {openModal.bind(this); openModal(!open)}} 
        />
);
UserIconMobile.displayName = 'UserIconMobile';
export default UserIconMobile;
